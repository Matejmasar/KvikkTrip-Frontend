import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FrontPage from "./pages/FrontPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import EnviromentPage from './pages/EnviromentPage.jsx';
import UserPage from './pages/UserPage.jsx';
import AboutUs from './pages/AboutUs.jsx';
import LoginPage from "./pages/LoginPage.jsx";
import History from './pages/History.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<FrontPage />}></Route>
                <Route path='/register' element={<RegistrationPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/userpage' element={<UserPage />}></Route>
                <Route path='/enviroment' element={<EnviromentPage />}></Route>
                <Route path='/aboutus' element={<AboutUs />}></Route>
                <Route path='/history' element={<History />}></Route>
            </Routes>
        </Router>
    )
}

export default App
