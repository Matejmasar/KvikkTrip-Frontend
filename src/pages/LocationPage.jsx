import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLocations } from "../services/apiservice.js";
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";

const LocationPage = () => {
    const { locationName } = useParams();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const locations = await getLocations();
                const matchedLocation = locations.find(loc => loc.name === decodeURIComponent(locationName))

                if (matchedLocation) {
                    setLocation(matchedLocation);
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
        <>
            <AppHeader/>
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
            <EndBar />
        </>
    );
};

export default LocationPage;
