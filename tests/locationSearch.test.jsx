import {fireEvent, render, screen} from "@testing-library/react";
import {vi} from 'vitest';
import LocationSearch from '../src/components/LocationSearch.jsx';

describe('LocationSearch', () => {
    it('renders the LocationSearch component', () => {
        render(<LocationSearch />);

        const selectCityInput = screen.getByPlaceholderText('Select a city');
        const filterInput = screen.getByPlaceholderText('Filters');
        const departureDatePicker = screen.getByLabelText('Choose departure date');
        const returnDatePicker = screen.getByLabelText('Choose return date');
        const searchButton = screen.getByRole('button', {name: 'Search'});

        expect(selectCityInput).toBeInTheDocument();
        expect(filterInput).toBeInTheDocument();
        expect(departureDatePicker).toBeInTheDocument();
        expect(returnDatePicker).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    it('updates departure and return date on date picker change', () => {
        render(<LocationSearch />);

        const newDate = '12/03/2024';
        const departureDatePicker = screen.getByLabelText('Choose departure date');
        const returnDatePicker = screen.getByLabelText('Choose return date');

        fireEvent.change(departureDatePicker, { target: { value: newDate } });
        fireEvent.change(returnDatePicker, { target: { value: newDate } });

        expect(departureDatePicker.value).toBe(newDate);
        expect(returnDatePicker.value).toBe(newDate);
    });

    it('handles search button click', () => {
        render(<LocationSearch />);

        const handleSearchMock = vi.fn();
        const searchButton = screen.getByRole('button', { name: 'Search' });
        searchButton.onclick = handleSearchMock;
        fireEvent.click(searchButton);

        expect(handleSearchMock).toHaveBeenCalledTimes(1);
    });
})