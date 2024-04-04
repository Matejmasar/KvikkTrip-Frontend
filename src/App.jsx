import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FrontPage from "./pages/FrontPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<FrontPage />}></Route>
                <Route path='/register' element={<RegistrationPage />}></Route>
            </Routes>
        </Router>
    )
}

export default App
