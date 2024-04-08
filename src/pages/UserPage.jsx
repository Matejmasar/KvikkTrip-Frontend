import './UserPage.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";
import TravelLocation from "../components/TravelLocation.js";
import LocationCard from "../components/LocationCard.jsx";
import EditButton from '../components/EditButton.jsx';
import {useEffect, useState} from "react";
import {getTags, getLocations, getUser, updateUser} from '../services/apiservice.js';
// import { getPreferences } from '../services/apiservice.js';


const UserPage = () => {
    const [user, setUser] = useState({ name: '', email: '' });
    const [editMode, setEditMode] = useState(false);
    const [tempUser, setTempUser] = useState({ name: '', email: '' });

    const user_id_mock = 1;

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(user_id_mock);
            setUser(user);
            setTempUser(user);
        };

        fetchUser().catch(error => console.error('Error fetching user:', error));
    }, []);

    const handleEditUserInfoClick = () => {
        setEditMode(true);
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
            await updateUser(user_id_mock, tempUser);
            setUser(tempUser);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleEditTagClick = () => {
        console.log('Edit preferences');
    };

    // const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(1); //user_id 1
            setUser(user);
        };

        fetchUser().catch(error => console.error('Error fetching tags:', error));
    }, []);

    const [preferences, setPreferences] = useState([]);

    useEffect(() => {
        const fetchPreferences = async () => {
            // const preferences = await getPreferences(1); //user_id 1
            const preferences = await getTags();
            setPreferences(preferences);
        };

        fetchPreferences().catch(error => console.error('Error fetching tags:', error));
    }, []);

    const [locs, setLocs] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const locations = await getLocations();
            const transformedLocations = locations.map(loc => new TravelLocation(loc.name, loc.gps, null, null, null));
            setLocs(transformedLocations);
        };

        fetchLocations().catch(error => console.error('Error fetching locations:', error));
    }, []);


    return (
        <>
            <AppHeader/>
            <div className='page-container'>
                <div className="grid-container">
                    <div className="gridItem" style={{marginRight: '10px'}}>
                        <h1 style={{ textAlign: 'center' }}>User info:</h1>
                        {editMode ? (
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
                                <button type="submit">Save Changes</button>
                            </form>
                        ) : (
                            <>
                                <h3>Name: {user.name}</h3>
                                <h3>Email: {user.email}</h3>
                                <EditButton onClick={handleEditUserInfoClick}/>
                            </>
                        )}
                        <h2>Personal preferences</h2>
                        <ul>
                            {preferences.map(tag => (
                                <li key={tag.value}>{tag.label}</li>
                            ))}
                        </ul>
                        <EditButton onClick={handleEditTagClick}/>
                        <div id="userEditForm"></div>
                    </div>
                    <div className="gridItem" style={{marginLeft: '10px'}}>
                        <h1 style={{ textAlign: 'center' }}>Recent trips:</h1>
                        {locs.map((loc, index) => (
                            <LocationCard key={index} location={loc}></LocationCard>    
                        ))}
                    </div>
                </div>
            </div>
            <EndBar/>
        </>
    )
}

export default UserPage;