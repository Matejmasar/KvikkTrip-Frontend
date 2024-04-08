import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FrontPage from "./pages/FrontPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import EnviromentPage from './pages/EnviromentPage.jsx';
import UserPage from './pages/UserPage.jsx';
import AboutUs from './pages/AboutUs.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<FrontPage />}></Route>
                <Route path='/register' element={<RegistrationPage />}></Route>
                <Route path='/userpage' element={<UserPage />}></Route>
                <Route path='/enviroment' element={<EnviromentPage />}></Route>
                <Route path='/aboutus' element={<AboutUs />}></Route>
            </Routes>
        </Router>
    )
}

export default App
