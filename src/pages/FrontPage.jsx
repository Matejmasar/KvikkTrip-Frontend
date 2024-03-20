import LocationCard from "../components/LocationCard.jsx";
import './FrontPage.css';
import LocationSearch from "../components/LocationSearch.jsx";
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";
import {getRecommendations} from "../services/apiservice.js";
import {useEffect, useState} from "react";

const FrontPage = () => {
    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState([]);

    const getLocations = async () => {
        const result = await getRecommendations();
        setRecommendations(result);
        setLoading(false);
    }

    const handleSearch = async (data) => {
        console.log(data);
    }

    useEffect(() => {
        getLocations();
    }, []);

    if (loading) {
        return (<div>Loading...</div>)
    }

    return (
        <div className='frontPageContainer'>
            <AppHeader/>
            <LocationSearch handleRecommendations={handleSearch}/>
            <div className="cards">
                {recommendations.map(
                    (recommendation, index) => (
                        <LocationCard key={index} location={recommendation} />
                    )
                )}
            </div>
            <EndBar/>
        </div>
    )
}

export default FrontPage;