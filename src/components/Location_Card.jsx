import TravelLocation from "./TravelLocation.js";
import PropTypes from "prop-types";
import './Location_Card.css';

const Location_Card = (props) => {
    const { location } = props;

    const handleClick = () => {
        console.log("Clicked")
    }

    return (
        <div className="card" onClick={handleClick}>
            <h2>{location.name}</h2>
            <div>{location.country}</div>
            <div>{location.weather}</div>
        </div>
    )
}

Location_Card.propTypes = {
    location: PropTypes.instanceOf(TravelLocation).isRequired
};

export default Location_Card;