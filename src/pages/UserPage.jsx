import './UserPage.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";
import TravelLocation from "../components/TravelLocation.js";
import LocationCard from "../components/LocationCard.jsx";
import Button from '../components/Button.jsx';
import {useEffect, useState} from "react";
import {getTags, getLocations, getUser, updateUser} from '../services/apiservice.js';
import { updatePreferences } from '../services/apiservice.js';
// import { getPreferences, getHistory } from '../services/apiservice.js';
import Select from "react-select";
import {useNavigate} from "react-router-dom";


const UserPage = () => {
    const navigator = useNavigate();

    const [user, setUser] = useState({ name: '', email: '', username: '' });
    const [tempUser, setTempUser] = useState({ name: '', email: '', username: '' });
    const [editUserMode, setEditUserMode] = useState(false);
    const [preferences, setPreferences] = useState([]);
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const [editPreferencesMode, setEditPreferencesMode] = useState(false);
    const [locs, setLocs] = useState([]);
    const [tags, setTags] = useState([]);

    const user_id = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(user_id);
            setUser(user);
            setTempUser(user);

            const locations = await getLocations();
            const transformedLocations = locations.map(loc => new TravelLocation(loc.name, loc.gps, null, null, null));
            setLocs(transformedLocations);
            // const locations = await getHistory(user_id);
            // const transformedLocations = locations.map(loc => new TravelLocation(loc.name, loc.gps, null, null, null));
            // setLocs(transformedLocations); 

            const mockPreferences = await getTags();
            setPreferences(mockPreferences);
            // const userPreferences = await getPreferences(user_id);
            // setSelectedPreferences(userPreferences);

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

    const handleEditPreferencesClick = () => {
        setEditPreferencesMode(true);
    };

    const handlePreferencesChange = selectedOptions => {
        setSelectedPreferences(selectedOptions);
    };

    const handleSavePreferences = async () => {
        const preferencesToSave = selectedPreferences.map(pref => pref.value);
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
                        <h1 style={{ textAlign: 'center' }}>User info:</h1>
                        {editUserMode ? (
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name">Name: </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={tempUser.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email: </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={tempUser.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="username">Username: </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={tempUser.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <Button onClick={handleEditUserInfoClick} text={'Save changes'} type="submit"/>
                            </form>
                        ) : (
                            <>
                                <h3>Name: {user.name}</h3>
                                <h3>Email: {user.email}</h3>
                                <h3>Username: {user.username}</h3>
                                <Button onClick={handleEditUserInfoClick} text={'EDIT USER INFO'}/>
                            </>
                        )}

                        <h2 style={{textAlign: 'center'}}>Personal preferences</h2>
                        {editPreferencesMode ? (
                            <>
                                <Select
                                    name="preferences"
                                    placeholder="Choose tags"
                                    defaultValue={preferences}
                                    isMulti
                                    onChange={handlePreferencesChange}
                                    options={tags}
                                />
                                <Button onClick={handleSavePreferences} text="Save Preferences" />
                            </>
                        ) : (
                            <>
                                <ul>
                                    {preferences.map(tag => ( //user_id's preferences
                                        <li key={tag.value}>{tag.label}</li>
                                    ))}
                                </ul>
                                <Button onClick={handleEditPreferencesClick} text="EDIT PREFERENCES" />
                            </>
                        )}
                    </div>
                    <div className="gridItem" style={{marginLeft: '10px'}}>
                        <h1 style={{ textAlign: 'center' }}>Recent trips:</h1>
                        {locs.slice(0,3).map((loc, index) => (
                            <LocationCard key={index} location={loc}></LocationCard>    
                        ))}
                        <Button onClick={() => navigator('/history')} text='SHOW ALL'></Button>
                    </div>
                </div>
            </div>
            <EndBar/>
        </>
    )
}

export default UserPage;