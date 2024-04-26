import NavBar from "./NavBar.jsx";
import Icon from '../assets/navbaricon.svg';
import {useNavigate} from "react-router-dom";
import './AppHeader.css';
import {useState} from "react";

const AppHeader = () => {
    const navigator = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="appHeader">
            <img src={Icon} className="icon" alt="navbar" onClick={toggleNavbar} onKeyDown={(e) => {
                if (e.key === 'N') toggleNavbar();
            }}/>
            {isOpen && (
                <NavBar />
            )}
            {localStorage.getItem('userId') !== null ? (
                <input type="button" onClick={() => navigator('/userpage')} value="Profile"/>
            ) : (
                <input type="button" onClick={() => navigator('/login')} value="Login here"/>
            )}
        </div>
    )
}

export default AppHeader;