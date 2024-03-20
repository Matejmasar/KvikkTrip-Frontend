import {fireEvent, render, screen} from "@testing-library/react";
import {vi} from "vitest";
import LocationCard from "../src/components/LocationCard.jsx";
import TravelLocation from "../src/components/TravelLocation.js";

describe('LocationCard', () => {
    it('renders a LocationCard component', () => {
        const picture = '/ny 1.png';
        const testLocation = new TravelLocation("Bergen", picture,"Norway", "Rain", '$$');

        render(<LocationCard location={testLocation}/>)

        const locName = screen.getByText('Bergen');
        const countryName = screen.getByText('Norway');
        const weather = screen.getByText('Rain');
        const price = screen.getByText('$$');

        expect(locName).toBeInTheDocument();
        expect(countryName).toBeInTheDocument();
        expect(weather).toBeInTheDocument();
        expect(price).toBeInTheDocument();
    });

    it('Cards are clickable', () => {
        const picture = '/ny 1.png';
        const testLocation = new TravelLocation("Bergen", picture,"Norway", "Rain", '$$');

        render(<LocationCard location={testLocation}/>)

        const cardButton = screen.getByRole('button');
        const handleClickMock = vi.fn();

        cardButton.onclick = handleClickMock;
        fireEvent.click(cardButton);

        expect(handleClickMock).toHaveBeenCalledTimes(1);
    });
})