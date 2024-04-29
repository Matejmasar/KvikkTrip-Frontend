import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {vi} from "vitest";
import RegistrationPage from "../src/pages/RegistrationPage.jsx";
import {BrowserRouter} from "react-router-dom";
import {registerUser} from "../src/services/loginservice.js";
import flagsmith from 'flagsmith';
import {FlagsmithProvider} from "flagsmith/react";

vi.mock("../src/services/loginservice.js", () => ({
    registerUser: vi.fn()
}));

vi.mock('flagsmith', () => {
    const originalModule = vi.importActual('flagsmith');
    return {
        __esModule: true,
        default: {
            init: vi.fn(),
            isFeatureEnabled: vi.fn(() => true),
            hasFeature: vi.fn(() => true),
            ...originalModule.default,
        }
    };
});

let usernameInput, nameInput, cityInput, passwordInput, confirmPasswordInput, emailInput, registerButton;

beforeEach( async() => {
    render(
        <FlagsmithProvider options={{
            environmentID: "f78QNBvL3GicXCJjvC9C9R",
            cacheFlags: true
        }} flagsmith={flagsmith}>
            <BrowserRouter>
                <RegistrationPage />
            </BrowserRouter>
        </FlagsmithProvider>
    )

    usernameInput = screen.getByRole('textbox', {name: 'Username:'});
    nameInput = screen.getByRole('textbox', {name: 'Name:'});
    cityInput = screen.getByRole('textbox', {name: 'City:'});
    passwordInput = screen.getByLabelText('Password:');
    confirmPasswordInput = screen.getByLabelText('Repeat Password:');
    emailInput = screen.getByRole('textbox', {name: 'Email:'});
    registerButton = screen.getByRole('button', {name: 'Register'});

    registerUser.mockClear();
});

describe('RegistrationPage', () => {
    it('should render correctly', () => {
        expect(usernameInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(cityInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(registerButton).toBeInTheDocument();
    });

    it('should focus correctly', () => {
        usernameInput.focus();
        expect(document.activeElement).toBe(usernameInput);

        fireEvent.keyDown(document.activeElement, {key: 'Enter'});
        expect(document.activeElement).toBe(nameInput);

        fireEvent.keyDown(document.activeElement, {key: 'Enter'});
        expect(document.activeElement).toBe(cityInput);

        fireEvent.keyDown(document.activeElement, {key: 'Enter'});
        expect(document.activeElement).toBe(passwordInput);

        fireEvent.keyDown(document.activeElement, {key: 'Enter'});
        expect(document.activeElement).toBe(confirmPasswordInput);

        fireEvent.keyDown(document.activeElement, {key: 'Enter'});
        expect(document.activeElement).toBe(emailInput);

        fireEvent.keyDown(document.activeElement, {key: 'Enter'});
        expect(registerUser).toHaveBeenCalled();
    });

    it('should register right values', async () => {
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(nameInput, { target: { value: 'Test User' } });
        fireEvent.change(cityInput, { target: { value: 'Test City' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.change(confirmPasswordInput, { target: {value: 'testpassword'}});
        fireEvent.change(emailInput, { target: { value: 'test@user.com' } });

        fireEvent.click(registerButton);

        await waitFor(() => {
           expect(registerUser).toHaveBeenCalledWith({
               username: 'testuser',
               name: 'Test User',
               city: 'Test City',
               password: 'testpassword',
               email: 'test@user.com',
           });
        });
    });

    it('passwords should match', () => {
        fireEvent.change(passwordInput, {target: {value: 'testpassword'}});
        fireEvent.change(confirmPasswordInput, {target: {value: 'password'}});

        fireEvent.click(registerButton);

        expect(registerUser).toHaveBeenCalledTimes(0);
    })
})