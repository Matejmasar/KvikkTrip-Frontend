import TravelLocation from "../components/TravelLocation.js";
import Location_Card from "../components/Location_Card.jsx";

const FrontPage = () => {
    const myLocation = new TravelLocation("Bergen", "Norway", "Rain");


    return (
        <div>
            <div>This is the front page :)</div>
            <div>
                <Location_Card location={myLocation}></Location_Card>
            </div>
        </div>
    )
}

export default FrontPage;