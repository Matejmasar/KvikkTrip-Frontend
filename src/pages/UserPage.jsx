import './UserPage.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";
import TravelLocation from "../components/TravelLocation.js";
import LocationCard from "../components/LocationCard.jsx";
import EditButton from '../components/EditButton.jsx';
import {useEffect, useState} from "react";


const UserPage = () => {
    const handleEditUserInfoClick = () => {
        console.log('Edit user info');
    };

    const handleEditTagClick = () => {
        console.log('Edit tags');
    };

    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch('/api/tags')
            .then(response => response.json())
            .then(data => setTags(data))
            .catch(error => console.error('Error fetching tags:', error));
    }, []);

    const [locs, setLocs] = useState([]);

    useEffect(() => {
        fetch('/api/locations')
            .then(response => response.json())
            .then(data => {
                const transformedLocations = data.map(loc => new TravelLocation(loc.name, loc.gps, null, null, null));
                setLocs(transformedLocations);
            })
            .catch(error => console.error('Error fetching locations:', error));
    }, []);


    return (
        <>
            <AppHeader/>
            <div className="grid-container">
                <div className="gridItem">
                    <h1 style={{ textAlign: 'center' }}>User info:</h1>
                    <h3>Name: </h3>
                    <h3>Email: </h3>
                    <EditButton onClick={handleEditUserInfoClick}/>
                    <h2>Personal preferences</h2>
                    <ul>
                        {tags.map(tag => (
                            <li key={tag.value}>{tag.label}</li>
                        ))}
                    </ul>
                    <EditButton onClick={handleEditTagClick}/>
                </div>
                <div className="gridItem">
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