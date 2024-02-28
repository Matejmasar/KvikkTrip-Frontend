import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import FrontPage from "./pages/FrontPage.jsx";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<FrontPage />}></Route>
            </Routes>
        </Router>
    )
}

export default App
