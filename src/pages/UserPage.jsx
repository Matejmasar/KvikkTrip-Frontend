import './UserPage.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";
import TravelLocation from "../components/TravelLocation.js";
import LocationCard from "../components/LocationCard.jsx";
import Button from '../components/Button.jsx';
import {useEffect, useState} from "react";
import {getTags, getUser, updateUser, getPreferences, updatePreferences, getHistory} from '../services/apiservice.js';
import {useNavigate} from "react-router-dom";


const UserPage = () => {
    const navigator = useNavigate();

    const [user, setUser] = useState({ name: '', email: '', username: '' });
    const [tempUser, setTempUser] = useState({ name: '', email: '', username: '' });
    const [editUserMode, setEditUserMode] = useState(false);
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [locs, setLocs] = useState([]);
    const [tags, setTags] = useState([]);

    const user_id = localStorage.getItem('userId');

    const picture = '/ny 1.png';

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(user_id);
            setUser(user);
            setTempUser(user);

            const locations = await getHistory(user_id);
            const transformedLocations = locations.map(loc => new TravelLocation(loc.name, picture, loc.country, loc.weather, loc.price));
            setLocs(transformedLocations); 

            const userPreferences = await getPreferences(user_id);
            setSelectedPreferences(userPreferences);

            let tags = await getTags()
            tags = tags.map(item => ({value: item.label, label: item.label}));
            setTags(tags);

        };
        fetchUser().catch(error => console.error('Error fetching user:', error));

    }, [user_id]);

    const handleEditUserInfoClick = () => {
        setEditUserMode(true);

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTempUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateUser(user_id, tempUser);
            setUser(tempUser);
            setEditUserMode(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const [editPreferencesMode, setEditPreferencesMode] = useState(false);
    const [preferencesInput, setPreferencesInput] = useState('');

    const handlePreferencesChange = (event) => {
        setPreferencesInput(event.target.value);
    };

    const parsePreferences = (input) => {
        return input.split(',').map(item => {
            const [label, weight] = item.trim().split(' ');
            return { label, weight: parseFloat(weight) };
        });
    };

    const handleSavePreferences = async () => {
        const preferencesToSave = parsePreferences(preferencesInput);
        console.log(preferencesToSave)
        try {
            await updatePreferences(user_id, preferencesToSave);
            setEditPreferencesMode(false);
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    };


    return (
        <>
            <AppHeader/>
            <div className='page-container'>
                <div className="grid-container">
                    <div className="gridItem" style={{marginRight: '10px'}}>
                        
                        <h1 style={{ textAlign: 'center' }} id='title'>User info:</h1>
                        <div className="user-info-grid">
                        {editUserMode ? (
                            <>
                            <form onSubmit={handleSubmit}>
                                <div className='user-info-item' id='name'>
                                        <label htmlFor="name"><h3>Name: </h3> </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={tempUser.name}
                                            onChange={handleChange} />
                                </div>
                                <div className='user-info-item' id='email'>
                                        <label htmlFor="email"><h3>Email: </h3> </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={tempUser.email}
                                            onChange={handleChange} />
                                </div>
                                <div className='user-info-item' id='username'>
                                        <label htmlFor="username"><h3>Username: </h3> </label>
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={tempUser.username}
                                            onChange={handleChange} />
                                </div>
                                <div className='user-info-item' id='button'>
                                    <Button onClick={handleEditUserInfoClick} text={'Save changes'} type="submit" />
                                </div>
                            </form>
                            </>
                        ) : (
                            <>
                                <div className='user-info-item' id='name'>
                                    <h3>Name: <br />{user.name} </h3>
                                </div>
                                <div className='user-info-item' id='email'>
                                    <h3>Email: <br />{user.email}</h3>
                                </div>
                                <div className='user-info-item' id='username'>
                                    <h3>Username: <br />{user.username}</h3>
                                </div>
                            
                                <div className='user-info-item' id='button'>
                                    <Button onClick={handleEditUserInfoClick} text={'EDIT USER INFO'}/>
                                </div>
                            </>
                        )}
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <h1>Personal Preferences:</h1>
                            <div className="preference-grid">
                                {editPreferencesMode ? (
                                    <>
                                        <div className='user-info-item' id='tags'>
                                            <h3>Tags to choose from: </h3>
                                            <ul>
                                                {tags.map(tag => (
                                                    <li key={tag.label}>{`${tag.label}`}</li>
                                                ))}
                                            </ul>
                                        </div>    
                                        <div className='user-info-item' id='prefs'>
                                            <input
                                                type="text"
                                                value={preferencesInput}
                                                onChange={handlePreferencesChange}
                                                placeholder="e.g., 'ski 0.5, party 0.6'"
                                            />
                                        </div>
                                        <div className='user-info-item' id='button2'>
                                            <Button onClick={handleSavePreferences} text='Save Preferences'></Button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='user-info-item' id='tags'>
                                            <ul>
                                                {selectedPreferences.map(tag => (
                                                    <li key={tag.label}>{`${tag.label} (Weight: ${tag.weight})`}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className='user-info-item' id='button2'>
                                            <Button onClick={() => setEditPreferencesMode(true)} text='EDIT PREFERENCES'></Button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="gridItem" style={{marginLeft: '10px'}}>
                        <h1 style={{ textAlign: 'center' }}>Recent trips:</h1>
                        <div className='locations-grid'>
                            {locs.slice(0,3).map((loc, index) => (
                                <LocationCard key={index} location={loc}></LocationCard>    
                            ))}
                        </div>
                        <div className='loc-button-grid'>
                            <div className='user-info-item' id='loc-button'>
                                <Button onClick={() => navigator('/history')} text='SHOW ALL'></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <EndBar/>
        </>
    )
}

export default UserPage;