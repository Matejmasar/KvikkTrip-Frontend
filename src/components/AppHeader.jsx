import NavBar from "./NavBar.jsx";
import {useNavigate} from "react-router-dom";
import './AppHeader.css';

const AppHeader = () => {
    const navigator = useNavigate()

    return (
        <div className="appHeader">
            <NavBar/>
            <input type="button" onClick={() => navigator('/')} value="Home"/>
            {localStorage.getItem('userId') !== null ? (
                <input type="button" onClick={() => navigator('/userpage')} value="Profile"/>
            ) : (
                <input type="button" onClick={() => navigator('/login')} value="Login here"/>
            )}
        </div>
    )
}

export default AppHeader;