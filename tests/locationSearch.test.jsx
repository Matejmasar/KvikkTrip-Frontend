import {render, screen} from "@testing-library/react";
import {describe, it} from "vitest";
import LocationSearch from '../src/components/LocationSearch.jsx'

describe('LocationSearch', () => {
    it('renders the LocationSearch component', () => {
        render(<LocationSearch />)

        screen.debug();
    })
})