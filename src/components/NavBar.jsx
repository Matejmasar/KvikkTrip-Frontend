import './NavBar.css';
import {logoutUser} from "../services/loginservice.js";

const NavBar = () => {

    const handleLogout = async () => {
        await logoutUser();
    }

    return (
        <li className="navbar">
            <a href={'/'}>Home</a>
            {localStorage.getItem('userId') !== null ? (
                <>
                    <a href={'/userpage'}>Profile Information</a>
                    <a href={'/environment'}>Environment Information</a>
                    <a>Help</a>
                    <a onClick={handleLogout}>Log out</a>
                </>
            ) : (
                <>
                    <a href={'/login'}>Log in</a>
                    <a href={'/register'}>Register</a>
                    <a href={'/enviroment'}>Environment Information</a>
                    <a>Help</a>
                </>
            )}
        </li>
    )
}

export default NavBar;