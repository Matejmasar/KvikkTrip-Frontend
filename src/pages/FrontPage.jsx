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
    const [filters, setFilters] = useState([]);

    const handleSearch = async (data) => {
        let filterValues = data.filters.map(filter => filter.value);
        setFilters(filterValues);
    }

    useEffect(() => {
        const handleRecommendations = async () => {
            const results = await getRecommendations(filters);
            setRecommendations(results);
            setLoading(false);
        }
        handleRecommendations();
    }, [filters]);

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