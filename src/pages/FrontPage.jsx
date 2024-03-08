import TravelLocation from "../components/TravelLocation.js";
import LocationCard from "../components/LocationCard.jsx";
import './FrontPage.css';
import LocationSearch from "../components/LocationSearch.jsx";
import AppHeader from "../components/AppHeader.jsx";

const FrontPage = () => {
    const picture = '/ny 1.png';
    const myLocation = new TravelLocation("Bergen", picture,"Norway", "Rain", '$$');


    return (
        <div>
            <AppHeader/>
            <LocationSearch/>
            <div className="cards">
                <LocationCard location={myLocation}></LocationCard>
                <LocationCard location={myLocation}></LocationCard>
                <LocationCard location={myLocation}></LocationCard>
                <LocationCard location={myLocation}></LocationCard>
                <LocationCard location={myLocation}></LocationCard>
                <LocationCard location={myLocation}></LocationCard>
            </div>
        </div>
    )
}

export default FrontPage;