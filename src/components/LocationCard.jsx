import TravelLocation from "./TravelLocation.js";
import PropTypes from "prop-types";
import './LocationCard.css';
function generateSymbols(price) {
    if (price === 1) {
        return "$";
    } else if (price === 2) {
        return "$$";
    } else if (price === 3) {
        return "$$$";
    } else {
        return "$$";
    }
}
const LocationCard = (props) => {
    const { location } = props;

    const navigator = useNavigate();

    const handleClick = () => {
        // console.log("Clicked")
        // console.log(loc_id)
        navigator(`/locations/${encodeURIComponent(location.name)}`)
        const encoded = encodeURIComponent(location.name)
        console.log(encoded)
        console.log(decodeURIComponent(encoded))
    }

    return (
        <div className="card" onClick={handleClick} onKeyDown={handleClick} role="button">
            <h2 className='locName'>{location.name}</h2>
            <div className='locPicture'>
                <img src={location.picture} alt={''}/>
            </div>
            <div className='countryName'>{location.country}</div>
            <div className='weather'>{location.weather}</div>
            <div className='price'>{generateSymbols(location.price)}</div>
        </div>
    )
}

LocationCard.propTypes = {
    location: PropTypes.instanceOf(TravelLocation).isRequired
};

export default LocationCard;