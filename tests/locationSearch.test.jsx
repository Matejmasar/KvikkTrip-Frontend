import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {vi} from 'vitest';
import LocationSearch from '../src/components/LocationSearch.jsx';

vi.mock("../src/services/apiservice.js", () => ({
    getTags: vi.fn(() => ["tag1", "tag2", "tag3"]),
    getLocations: vi.fn(() => ["loc1"])
}));

describe('LocationSearch', () => {
    const handleRecommendationMock = vi.fn();
    beforeEach(async () => {
        render(<LocationSearch handleRecommendations={handleRecommendationMock}/>);
        await waitFor(() => {
            // eslint-disable-next-line jest/no-standalone-expect
            expect(screen.queryByText('Loading...')).toBeNull();
        });
    });

    it('renders the LocationSearch component', async () => {
        const departureDatePicker = screen.getByLabelText('Choose departure date');
        const returnDatePicker = screen.getByLabelText('Choose return date');
        const searchButton = screen.getByRole('button', {name: 'Search'});

        expect(departureDatePicker).toBeInTheDocument();
        expect(returnDatePicker).toBeInTheDocument();
        expect(searchButton).toBeInTheDocument();
    });

    it('updates departure and return date on date picker change', async () => {
        const newDate = '12/03/2024';
        const departureDatePicker = screen.getByLabelText('Choose departure date');
        const returnDatePicker = screen.getByLabelText('Choose return date');

        fireEvent.change(departureDatePicker, { target: { value: newDate } });
        fireEvent.change(returnDatePicker, { target: { value: newDate } });

        expect(departureDatePicker.value).toBe(newDate);
        expect(returnDatePicker.value).toBe(newDate);
    });

    it('handles search button click', async () => {
        const searchButton = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchButton);

        expect(handleRecommendationMock).toHaveBeenCalledTimes(1);
    });
})