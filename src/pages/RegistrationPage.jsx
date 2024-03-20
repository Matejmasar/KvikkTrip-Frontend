import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {registerUser} from "../services/loginservice.js";

const RegistrationPage = () => {
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        password: '',
        email: '',
    });

    const navigator = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleRegister = async () => {
        registerUser(userData);
        navigator("/");
    }

    return (
        <div>
            <h1>Register new account</h1>
            <div className="formcontainer">
                <div className="forminput">
                    <label htmlFor="username">Username: </label>
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
                    <label htmlFor="name">Name: </label>
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
                    <label htmlFor="password">Password: </label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") document.getElementById("email").focus();
                        }}
                    />
                </div>
                <div className="forminput">
                    <label htmlFor="email">Email: </label>
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
            </div>
            <input type="button" onClick={handleRegister} value="Register"/>
            <br />
            <Link to="/">Already have an account? Login here</Link>
        </div>
    )
}

export default RegistrationPage;