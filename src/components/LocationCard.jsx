import TravelLocation from "./TravelLocation.js";
import PropTypes from "prop-types";
import './LocationCard.css';

const LocationCard = (props) => {
    const { location } = props;

    const handleClick = () => {
        console.log("Clicked")
    }

    return (
        <div className="card" onClick={handleClick} onKeyDown={handleClick} role="button">
            <h2>{location.name}</h2>
            <div>{location.country}</div>
            <div>{location.weather}</div>
        </div>
    )
}

LocationCard.propTypes = {
    location: PropTypes.instanceOf(TravelLocation).isRequired
};

export default LocationCard;