import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../services/loginservice.js";
import "./RegistrationPage.css";
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";

const RegistrationPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        password: '',
        email: '',
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [goodPassword, setGoodPassword] = useState(true);

    const navigator = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const checkPasswords = () => {
        if (userData.password === confirmPassword) {
            setGoodPassword(true);
            return true
        }
        else {
            setGoodPassword(false);
            return false
        }
    }

    const handleRegister = async () => {
        if (checkPasswords()) {
            await registerUser(userData);
            navigator("/");
        }
    }

    return (
        <div>
            <AppHeader />
            <div className="register">
                <h1>Register new account</h1>
                <div className="formcontainer">
                    <div className="forminput">
                        <label className="formlabel" htmlFor="username">Username: </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={userData.username}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") document.getElementById("name").focus();
                            }}
                        />
                    </div>
                    <div className="forminput">
                        <label className="formlabel" htmlFor="name">Name: </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={userData.name}
                            onChange={handleChange}
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
                            value={userData.password}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") document.getElementById("confirmpassword").focus();
                            }}
                        />
                    </div>
                    <div className="forminput">
                        <label className="formlabel" htmlFor="confirmpassword">Repeat Password: </label>
                        <input
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            placeholder="Repeat Password"
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") document.getElementById("email").focus();
                            }}
                        />
                    </div>
                    <div className="forminput">
                        <label className="formlabel" htmlFor="email">Email: </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleChange}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleRegister();
                            }}
                        />
                    </div>
                    {!goodPassword ? <p>Password does not match</p> : <p></p>}
                </div>
                <div className="registerbuttons">
                    <input className="registerbutton" type="button" onClick={handleRegister} value="Register"/>
                    <br/>
                    <Link className="loginlink" to="/login">Already have an account? Login here</Link>
                </div>
            </div>
            <EndBar />
        </div>
    )
}

export default RegistrationPage;