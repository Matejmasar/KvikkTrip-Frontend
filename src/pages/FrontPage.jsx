import TravelLocation from "../components/TravelLocation.js";
import Location_Card from "../components/Location_Card.jsx";
import './FrontPage.css';

const FrontPage = () => {
    const myLocation = new TravelLocation("Bergen", "Norway", "Rain");


    return (
        <div>
            <h1 className="header">This is the front page :)</h1>
            <div className="cards">
                <Location_Card location={myLocation}></Location_Card>
                <Location_Card location={myLocation}></Location_Card>
                <Location_Card location={myLocation}></Location_Card>
                <Location_Card location={myLocation}></Location_Card>
                <Location_Card location={myLocation}></Location_Card>
                <Location_Card location={myLocation}></Location_Card>
            </div>
        </div>
    )
}

export default FrontPage;