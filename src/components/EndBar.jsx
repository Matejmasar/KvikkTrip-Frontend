import './EndBar.css';

const EndBar = () => {
    return (
        <>
            <footer className="footerContainer1">
                <ul className="NavList">
                    <li className="NavItem"><a className="NavLink" href="#">ABOUT US</a></li>
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
            </footer>
        </>
    );
}

export default EndBar;