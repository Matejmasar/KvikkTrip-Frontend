import {vi} from "vitest";
import {fireEvent, render, screen, act, waitFor} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import LoginPage from "../src/pages/LoginPage.jsx";
import {loginUser} from "../src/services/loginservice.js";

vi.mock("../src/services/loginservice.js", () => ({
    loginUser: vi.fn(() => localStorage.setItem('userId', 10))
}));

let usernameInput, passwordInput, loginButton;

beforeEach(() => {
    render(
        <BrowserRouter>
            <LoginPage />
        </BrowserRouter>
    );

    usernameInput = screen.getByRole('textbox', {name: 'Username:'});
    passwordInput = screen.getByLabelText('Password:');
    loginButton = screen.getByRole('button', {name: 'Login'});
});

describe('LoginPage + AppHeader', () => {
    it('should render all components', () => {
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('should focus correctly', () => {
        usernameInput.focus();
        expect(document.activeElement).toBe(usernameInput);

        fireEvent.keyDown(document.activeElement, {key: 'Enter'});
        expect(document.activeElement).toBe(passwordInput);

        fireEvent.keyDown(document.activeElement, {key: 'Enter'});
        expect(loginUser).toHaveBeenCalled();
    });

    it('should log in with right values', () => {
        fireEvent.change(usernameInput, {target: {value: 'testUser'}});
        fireEvent.change(passwordInput, {target: {value: 'testPassword'}});
        act(() => {
            fireEvent.click(loginButton);
        });

        expect(loginUser).toHaveBeenCalledWith('testUser', 'testPassword');

        act(() => {
            localStorage.clear();
        });
    });

    it('should change the headerButton when logged in', async () => {
        let headerButton = screen.getByRole('button', {name: 'Login here'});
        expect(headerButton).toBeInTheDocument();

        act(() => {
            fireEvent.click(loginButton);
        });
        expect(loginUser).toHaveBeenCalled();

        await waitFor(() => {
            headerButton = screen.getByRole('button', {name: 'Profile'});
            expect(headerButton).toBeInTheDocument();
        });
    });
})