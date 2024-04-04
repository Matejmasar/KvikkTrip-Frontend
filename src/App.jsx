import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FrontPage from "./pages/FrontPage.jsx";
import RegistrationPage from "./pages/RegistrationPage.jsx";
import EnviromentPage from './pages/EnviromentPage.jsx';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<FrontPage />}></Route>
                <Route path='/register' element={<RegistrationPage />}></Route>
                <Route path='/userpage' element={<UserPage />}></Route>
                <Route path='/enviroment' element={<EnviromentPage />}></Route>
            </Routes>
        </Router>
    )
}

export default App
