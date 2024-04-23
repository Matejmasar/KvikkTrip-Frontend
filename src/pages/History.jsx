import './History.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";
import TravelLocation from "../components/TravelLocation.js";
import LocationCard from "../components/LocationCard.jsx";
import Button from '../components/Button.jsx';
import {useEffect, useState} from "react";
import {getLocations} from "../services/apiservice.js"
// import {getHistory} from "../services/apiservice.js"
import {useNavigate} from "react-router-dom";


const History = () => {
    const navigator = useNavigate();

    const [locs, setLocs] = useState([]);

    const user_id = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUser = async () => {
            const locations = await getLocations();
            const transformedLocations = locations.map(loc => new TravelLocation(loc.name, loc.gps, null, null, null));
            setLocs(transformedLocations);
            // const locations = await getHistory(user_id);
            // const transformedLocations = locations.map(loc => new TravelLocation(loc.name, loc.gps, null, null, null));
            // setLocs(transformedLocations);
        };
        fetchUser().catch(error => console.error('Error fetching user:', error));

    }, [user_id]);

    return (
        <>
            <AppHeader/>
            <div className='page-container1'>
                <div className="grid-container1">
                    <div className='gridItem1'>
                        <h1>Travel history:</h1>
                        {locs.map((loc, index) => (
                            <LocationCard key={index} location={loc}></LocationCard>    
                        ))}
                        <Button onClick={() => navigator('/userpage')} text='BACK TO PROFILE'></Button>
                    </div>
                </div>
            </div>
            <EndBar/>
        </>
    )
}

export default History;