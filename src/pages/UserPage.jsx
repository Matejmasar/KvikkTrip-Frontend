import './UserPage.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";
import TravelLocation from "../components/TravelLocation.js";
import LocationCard from "../components/LocationCard.jsx";
import EditButton from '../components/EditButton.jsx';
import {useEffect, useState} from "react";
import {getTags, getLocations} from '../services/apiservice.js';


const UserPage = () => {
    const handleEditUserInfoClick = () => {
        console.log('Edit user info');
    };

    const handleEditTagClick = () => {
        console.log('Edit tags');
    };

    const [preferences, setPreferences] = useState([]);

    useEffect(() => {
        const fetchTags = async () => {
            const tags = await getTags();
            setPreferences(tags);
        };

        fetchTags().catch(error => console.error('Error fetching tags:', error));
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
            <div className="grid-container">
                <div className="gridItem" style={{marginRight: '10px'}}>
                    <h1 style={{ textAlign: 'center' }}>User info:</h1>
                    <h3>Name: </h3>
                    <h3>Email: </h3>
                    <EditButton onClick={handleEditUserInfoClick}/>
                    <h2>Personal preferences</h2>
                    <ul>
                        {preferences.map(tag => (
                            <li key={tag.value}>{tag.label}</li>
                        ))}
                    </ul>
                    <EditButton onClick={handleEditTagClick}/>
                </div>
                <div className="gridItem" style={{marginLeft: '10px'}}>
                    <h1 style={{ textAlign: 'center' }}>Recent trips:</h1>
                    {locs.map((loc, index) => (
                        <LocationCard key={index} location={loc}></LocationCard>    
                    ))}
                </div>
            </div>
            <EndBar/>
        </>
    )
}

export default UserPage;