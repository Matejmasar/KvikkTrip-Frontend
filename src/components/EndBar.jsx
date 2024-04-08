import './EndBar.css';

const EndBar = () => {
    return (
        <>
            {/* <footer className="footerContainer1">
                <ul className="NavList">
                    <li className="NavItem"><a className="NavLink" href="/aboutus">ABOUT US</a></li>
                    <li className="NavItem"><a className="NavLink" href="#">CUSTOMER SERVICE</a></li>
                    <li className="NavItem"><a className="NavLink" href="#">TRAVELING INFORMATION</a></li>
                </ul>
            </footer>
            <footer className="footerContainer2">
                <ul className="NavList">
                    <li className="NavItem"><a className="NavLink" href="#">COOKIES</a></li>
                    <li className="NavItem"><a className="NavLink" href="#">TERMS OF USE</a></li>
                    <li className="NavItem"><a className="NavLink" href="#">DATA MANAGING</a></li>
                </ul>
            </footer> */}
            <footer>
                <div class="row top-row">
                    <a href="/aboutus">ABOUT US</a>
                    <a href="#">TRAVELING INFORMATION</a>
                    <a href="#">CUSTOMER SERVICE</a>
                </div>
                <div class="row bottom-row">
                    <a href="#">COOKIES</a>
                    <a href="#">TERMS OF USE</a>
                    <a href="#">DATA MANAGING</a>
                </div>
            </footer>
        </>
    );
}

export default EndBar;