import {vi} from 'vitest';
import {render, screen, act, waitFor, fireEvent} from "@testing-library/react";
import NavBar from "../src/components/NavBar.jsx";
import {logoutUser} from "../src/services/loginservice.js";

vi.mock("../src/services/loginservice.js", () => ({
    logoutUser: vi.fn(() => localStorage.clear())
}));

beforeEach(() => {
   logoutUser.mockClear();
});

describe('Navbar', () => {
    render(<NavBar/>);

    it('should render correctly while logged out', () => {
        const loginRef = screen.getByRole('link', {name: 'Log in'});
        const registerRef = screen.getByRole('link', {name: 'Register'});
        const environmentRef = screen.getByRole('link', {name: 'Environment Information'});

        expect(loginRef).toBeInTheDocument();
        expect(registerRef).toBeInTheDocument();
        expect(environmentRef).toBeInTheDocument();
    });

    it('should render correctly when logged in', async () => {
        act(() => {
            localStorage.setItem('userId', 10);
        });
        render(<NavBar/>);

        await waitFor(() => {
            const userPageRef = screen.getByRole('link', {name: 'Profile Information'});
            const environmentRef = screen.getByRole('link', {name: 'Environment Information'});
            const logoutRef = screen.getByText("Log out");

            expect(userPageRef).toBeInTheDocument();
            expect(environmentRef).toBeInTheDocument();
            expect(logoutRef).toBeInTheDocument();
        });

        localStorage.clear();
    });

    it('should change fields when logging out', async () => {
        act(() => {
           localStorage.setItem('userId', 10);
        });
        render(<NavBar/>);

        const logoutRef = screen.getByText("Log out");
        expect(logoutRef).toBeInTheDocument();

        act(() => {
            fireEvent.click(logoutRef);
        });
        expect(logoutUser).toHaveBeenCalled();

        render(<NavBar/>);
        await waitFor(() => {
           const loginRef =  screen.getByRole('link', {name: 'Log in'});
           expect(loginRef).toBeInTheDocument();
        });
    });

    it('should let you log out with key', () => {
        act(() => {
            localStorage.setItem('userId', 10);
        });
        render(<NavBar/>);

        const logoutRef = screen.getByText("Log out");
        expect(logoutRef).toBeInTheDocument();

        act(() => {
           fireEvent.keyDown(logoutRef, {key: 'f'});
        });
        expect(logoutUser).toHaveBeenCalled();
    }) ;
});