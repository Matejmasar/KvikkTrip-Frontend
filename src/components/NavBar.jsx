import './NavBar.css';
import {logoutUser} from "../services/loginservice.js";
import {useState} from "react";
import HelpPopup from "./HelpPopup.jsx";

const NavBar = () => {
    const [helpOpen, setHelpOpen] = useState(false);

    const handleLogout = async () => {
        await logoutUser();
    }

    const toggleHelp = () => {
        setHelpOpen(!helpOpen);
    }

    return (
        <>
            <li className="navbar">
                <a href={'/'}>Home</a>
                {localStorage.getItem('userId') !== null ? (
                    <>
                        <a href={'/userpage'}>Profile Information</a>
                        <a href={'/environment'}>Environment Information</a>
                        <a role="button" onClick={toggleHelp}>Help</a>
                        <a onClick={handleLogout} onKeyDown={(e) => {
                            if (e.key === 'f') handleLogout();
                        }}>Log out</a>
                    </>
                ) : (
                    <>
                        <a href={'/login'}>Log in</a>
                        <a href={'/register'}>Register</a>
                        <a href={'/enviroment'}>Environment Information</a>
                        <a role="button" onClick={toggleHelp}>Help</a>
                    </>
                )}
            </li>
            {helpOpen ? (<HelpPopup/>) : null}
        </>
    );
}

export default NavBar;