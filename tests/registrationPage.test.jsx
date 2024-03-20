import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {vi} from "vitest";
import RegistrationPage from "../src/pages/RegistrationPage.jsx";
import {BrowserRouter} from "react-router-dom";
import {registerUser} from "../src/services/loginservice.js";

vi.mock("../src/services/loginservice.js", () => ({
    registerUser: vi.fn()
}));

let usernameInput, nameInput, passwordInput, emailInput, registerButton;

beforeEach(() => {
    render(
        <BrowserRouter>
            <RegistrationPage />
        </BrowserRouter>
    )

    usernameInput = screen.getByRole('textbox', {name: 'Username:'});
    nameInput = screen.getByRole('textbox', {name: 'Name:'});
    passwordInput = screen.getByRole('textbox', {name: 'Password:'});
    emailInput = screen.getByRole('textbox', {name: 'Email:'});
    registerButton = screen.getByRole('button', {name: 'Register'});
});

describe('RegistrationPage', () => {
    it('should render correctly', () => {
        expect(usernameInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    it('should register right values', async () => {
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(nameInput, { target: { value: 'Test User' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.change(emailInput, { target: { value: 'test@user.com' } });

        fireEvent.click(registerButton);

        await waitFor(() => {
           expect(registerUser).toHaveBeenCalledWith({
               username: 'testuser',
               name: 'Test User',
               password: 'testpassword',
               email: 'test@user.com',
           });
        });
    });
})