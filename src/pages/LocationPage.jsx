import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocations } from "../services/apiservice.js";

const LocationPage = () => {
    const { locationName } = useParams();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const locations = await getLocations();
                console.log(locations);
                const matchedLocation = locations.filter(loc => loc.name === decodeURIComponent(locationName));

                if (matchedLocation.length > 0) {
                    setLocation(matchedLocation[0]);
                } else {
                    setError('Location not found');
                    setLocation(null);
                }
            } catch (err) {
                setError('An error occurred while fetching the locations');
                setLocation(null);
            }
        };

        fetchLocation();
    }, [locationName]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!location) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>{locationName}</p>
            <h1>{location.name}</h1>
            <img src={``} alt={`${location.name}`} />
            <p>{location.country}</p>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
            <p>Price: {location.price}</p>
            <p>Tags: {location.tags}</p>
        </div>
    );
};

export default LocationPage;
