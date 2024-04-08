import './AboutUs.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";


const EnviromentPage = () => {
    return (
        <>
            <AppHeader/>
            <div className='gridItem'>
                <h1>About us:</h1>
                <p>
                School project where we want to make traveling easier for you.<br />
                ...<br />
                Have fun and safe travels.<br />
                </p>
            </div>
            <EndBar/>
        </>
    )
}

export default EnviromentPage;