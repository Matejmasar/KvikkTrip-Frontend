import TravelLocation from "./TravelLocation.js";
import PropTypes from "prop-types";

const Location_Card = (props) => {
    const { location } = props;

    return (
        <div>
            <h>{location.name}</h>
            <h>{location.country}</h>
            <h>{location.weather}</h>
        </div>
    )
}

Location_Card.propTypes = {
    location: PropTypes.instanceOf(TravelLocation).isRequired
};

export default Location_Card;