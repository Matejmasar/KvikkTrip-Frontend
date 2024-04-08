import NavBar from "./NavBar.jsx";
import {useNavigate} from "react-router-dom";
import './AppHeader.css';

const AppHeader = () => {
    const navigator = useNavigate()

    const handleClick = () => {
        navigator('/userpage');
    }

    return (
        <div className="appHeader">
            <NavBar/>
            <input type="button" onClick={handleClick} value="Profile"/>
        </div>
    )
}

export default AppHeader;