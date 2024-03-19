import './UserPage.css';
import AppHeader from "../components/AppHeader.jsx";
import EndBar from "../components/EndBar.jsx";
import TravelLocation from "../components/TravelLocation.js";
import LocationCard from "../components/LocationCard.jsx";
import EditButton from '../components/EditButton.jsx'; //


const UserPage = () => {
    const myLocation = new TravelLocation("Bergen", null,"Norway", "Rain", '$$');

    const handleEditUserInfoClick = () => {
        console.log('Edit user info');
    };

    const handleEditTagClick = () => {
        console.log('Edit tags');
    };

    return (
        <>
            <AppHeader/>
            <div className="grid-container">
                <div className="gridItem">
                    <h1>User info:</h1>
                    <h3>Name: </h3>
                    <h3>Email: </h3>
                    <EditButton onClick={handleEditUserInfoClick} />
                    <h2>Personal preferences</h2>
                    <EditButton onClick={handleEditTagClick} />
                </div>
                <div className="gridItem">
                    <h1>Recent trips:</h1>
                    <LocationCard location={myLocation}></LocationCard>
                    <LocationCard location={myLocation}></LocationCard>
                    <LocationCard location={myLocation}></LocationCard>
                </div>
            </div>
            <EndBar/>
        </>
    )
}

export default UserPage;