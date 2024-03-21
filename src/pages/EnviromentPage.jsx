import './EnviromentPage.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";


const EnviromentPage = () => {
    return (
        <>
            <AppHeader/>
            <div className='gridItem'>
                <h1>Enviroment information:</h1>
                <p>
                In a world increasingly aware of the delicate balance of our ecosystem, Kvikk Trip emerges as a beacon for environmentally conscious travelers. Our app is driven by a profound commitment to preserving the stunning diversity of our planet for future generations. Recognizing the impact that travel can have on the environment, we aim to empower users  to make informed, sustainable choices. Whether it's reducing carbon footprints through smarter travel itineraries or promoting eco-friendly accommodations and activities, Kvikk Trip is dedicated to transforming the joy of exploration into a force for environmental stewardship. By leveraging technology, we are not just simplifying travel; we are fostering a global community where each journey enriches both the traveler and the earth.
                </p>
            </div>
            <EndBar/>
        </>
    )
}

export default EnviromentPage;