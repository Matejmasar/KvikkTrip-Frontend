import './History.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";
import TravelLocation from "../components/TravelLocation.js";
import LocationCard from "../components/LocationCard.jsx";
import Button from '../components/Button.jsx';
import {useEffect, useState} from "react";
import {getHistory} from "../services/apiservice.js"
import {useNavigate} from "react-router-dom";


const History = () => {
    const navigator = useNavigate();

    const [locs, setLocs] = useState([]);

    const user_id = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUser = async () => {
            const locations = await getHistory(user_id);
            const transformedLocations = locations.map(loc => new TravelLocation(loc.name, loc.gps, null, null, null));
            setLocs(transformedLocations);
        };
        fetchUser().catch(error => console.error('Error fetching user:', error));

    }, [user_id]);

    return (
        <>
            <AppHeader/>
            <div className='page-container2'>
                <div className="grid-container2">
                    <h1>Travel history:</h1>
                    <div className='gridItem2'>  
                        {locs.map((loc, index) => (
                            <LocationCard key={index} location={loc}></LocationCard>    
                        ))}
                    </div>
                    <div className='bottomItem'>
                        <Button onClick={() => navigator('/userpage')} text='BACK TO PROFILE'></Button>
                    </div>
                </div>
            </div>
            <EndBar/>
        </>
    )
}

export default History;