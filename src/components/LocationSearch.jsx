import {useEffect, useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import Select from "react-select";

import 'react-datepicker/dist/react-datepicker.css';
import './LocationSearch.css';
import dayjs from "dayjs";
import {getLocations, getTags} from "../services/apiservice.js";
import PropTypes from "prop-types";

const LocationSearch = ({handleRecommendations}) => {
    const [loading, setLoading] = useState(true);

    const [departureDate, setDepartureDate] = useState(dayjs().format('DD/MM/YYYY'));
    const [returnDate, setReturnDate] = useState(dayjs().format('DD/MM/YYYY'));
    const [location, setLocation] = useState("");
    const [filters, setFilters] = useState([]);

    const [tags, setTags] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect( () => {
        async function fetchResources() {
            const tagResult = await getTags();
            const locationResult = await getLocations();

            setTags(tagResult);
            setLocations(locationResult);

            setLoading(false);
        }

        fetchResources();
    }, []);

    const handleSearch = () => {
        handleRecommendations({departureDate, returnDate, location, filters});
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="searchContainer">
            <div className="inputContainer">
                <Select
                    name="locationSelect"
                    placeholder="Choose location"
                    defaultValue={location}
                    onChange={setLocation}
                    options={locations}
                />
                <Select
                    name="filterSelect"
                    placeholder="Choose filters"
                    defaultValue={filters}
                    isMulti
                    onChange={setFilters}
                    options={tags}
                />
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Choose departure date" sx={{ backgroundColor: 'white'}} onChange={
                        (date) => setDepartureDate(date.format('DD/MM/YYYY'))}
                    />
                    <DatePicker label="Choose return date" sx={{ backgroundColor: 'white'}} onChange={
                        (date) => setReturnDate(date.format('DD/MM/YYYY'))
                    }/>
                </LocalizationProvider>
            </div>
            <input type='button' onClick={handleSearch} value='Search'></input>
        </div>
    )
}

LocationSearch.propTypes = {
    handleRecommendations: PropTypes.func.isRequired,
};

export default LocationSearch;