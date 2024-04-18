import {useState} from "react";
import AppHeader from "../components/AppHeader.jsx";
import {loginUser} from "../services/loginservice.js";
import {Link, useNavigate} from "react-router-dom";
import "./RegistrationPage.css"

const LoginPage = () => {
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loginFault, setLoginFault] =  useState(false);
    const navigator = useNavigate();

    const handleLogin = async () => {
        const result = await loginUser(username, password);
        if (result) {
            navigator('/');
        }
        else {
            setLoginFault(true);
        }
    }

    return (
        <div>
            <AppHeader />
            <div className="register">
                <h1>Log in to your account</h1>
                <div className="formcontainer">
                    <div className="forminput">
                        <label className="formlabel" htmlFor="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") document.getElementById("password").focus();
                            }}
                        />
                    </div>
                    <div className="forminput">
                        <label className="formlabel" htmlFor="password">Password: </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleLogin();
                            }}
                        />
                    </div>
                    {loginFault ? <p>Wrong username or password</p> : <p></p>}
                </div>
                <div className="registerbuttons">
                    <input className="registerbutton" type="button" onClick={handleLogin} value="Login"/>
                    <br/>
                    <Link className="loginlink" to='register'>Dont have an account? Register here</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;