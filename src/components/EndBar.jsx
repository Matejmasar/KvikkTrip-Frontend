import './EndBar.css';

const EndBar = () => {
    return (
        <>
            <footer>
                <div className="row top-row">
                    <a href="/aboutus">ABOUT US</a>
                    <a href="#">TRAVELING INFORMATION</a>
                    <a href="#">CUSTOMER SERVICE</a>
                </div>
                <div className="row bottom-row">
                    <a href="#">COOKIES</a>
                    <a href="#">TERMS OF USE</a>
                    <a href="#">DATA MANAGING</a>
                </div>
            </footer>
        </>
    );
}

export default EndBar;