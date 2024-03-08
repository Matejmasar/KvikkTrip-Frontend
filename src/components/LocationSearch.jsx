import {useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, DatePicker} from "@mui/x-date-pickers";

import 'react-datepicker/dist/react-datepicker.css';
import './LocationSearch.css';
import dayjs from "dayjs";

const LocationSearch = () => {
    const [departureDate, setDepartureDate] = useState(dayjs().format('DD/MM/YYYY'));
    const [returnDate, setReturnDate] = useState(dayjs().format('DD/MM/YYYY'));

    const handleSearch = () => {
        console.log("Departure: " + departureDate + " ReturnDate: " + returnDate);
    }

    return (
        <div className="searchContainer">
            <div className="inputContainer">
                <input type="text" name="SelectCity" placeholder="Select a city"/>
                <input type="text" name="Filters" placeholder="Filters"/>
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Choose departure date" onChange={
                        (date) => setDepartureDate(date.format('DD/MM/YYYY'))}
                    />
                    <DatePicker label="Choose return date" onChange={
                        (date) => setReturnDate(date.format('DD/MM/YYYY'))
                    }/>
                </LocalizationProvider>
            </div>
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default LocationSearch;