import {fireEvent, render, screen} from "@testing-library/react";
import {vi} from 'vitest';
import LocationSearch from '../src/components/LocationSearch.jsx';

describe('LocationSearch', () => {
    it('renders the LocationSearch component', () => {
        render(<LocationSearch handleRecommendations={vi.fn}/>);

        const departureDatePicker = screen.getByLabelText('Choose departure date');
        const returnDatePicker = screen.getByLabelText('Choose return date');
        const searchButton = screen.getByRole('button', {name: 'Search'});

        expect(departureDatePicker).toBeInTheDocument();
        expect(returnDatePicker).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    it('updates departure and return date on date picker change', () => {
        render(<LocationSearch handleRecommendations={vi.fn}/>);

        const newDate = '12/03/2024';
        const departureDatePicker = screen.getByLabelText('Choose departure date');
        const returnDatePicker = screen.getByLabelText('Choose return date');

        fireEvent.change(departureDatePicker, { target: { value: newDate } });
        fireEvent.change(returnDatePicker, { target: { value: newDate } });

        expect(departureDatePicker.value).toBe(newDate);
        expect(returnDatePicker.value).toBe(newDate);
    });

    it('handles search button click', () => {
        const handleRecommendationMock = vi.fn();

        render(<LocationSearch handleRecommendations={handleRecommendationMock}/>);

        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);

        expect(handleRecommendationMock).toHaveBeenCalledTimes(1);
    });
})