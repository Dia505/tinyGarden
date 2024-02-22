import "../css-files/HeaderAdmin.css"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import {toast} from "react-toastify";
function HeaderAdmin() {
    const [sidenavWidth, setSidenavWidth] = useState<string>('0');
    const navigate = useNavigate();
    const [isSideNavDropDownVisible, setSideNavDropDownVisible] = useState(false);

    const toggleNav = () => {
        setSidenavWidth(prevWidth => (prevWidth === '0' ? '220px' : '0'));
    };

    const handleResize = () => {
        if (window.innerWidth > 1040) {
            setSidenavWidth('0');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUserId');
        toast.success('You have logged out!');
        navigate('/login');
    }

    return (
        <>
            <div className={"header-admin"}>
                <div className={"right-section-admin"}>
                    <img className={"logo-admin"} src={"src/assets/logo2.png"}/>
                </div>

                <div className={"left-section-admin"}>
                    <Link to={"/adminCustomer"}><p className={"customer-btn-admin"}>Customers</p></Link>

                    <div className={"product-admin-container"}>
                        <p className={"product-btn-admin"}>Products <FontAwesomeIcon icon={faCaretDown} />
                            <div className={"product-drop-down-admin"}>
                                <Link to={"/adminFoliage"}><button className={"drop-down-btn"}>Foliage</button></Link>
                                <Link to={"/adminSucculent"}><button className={"drop-down-btn"}>Succulents</button></Link>
                                <Link to={"/adminCactus"}><button className={"drop-down-btn"}>Cacti</button></Link>
                                <Link to={"/adminFlower"}><button className={"drop-down-btn"}>Flowering</button></Link>
                                <Link to={"/adminHerb"}><button className={"drop-down-btn"}>Herbs</button></Link>
                                <Link to={"/productAnalytics"}><button className={"drop-down-btn"}>Analytics</button></Link>
                            </div>
                        </p>
                    </div>

                    <Link to={"/adminOrder"}><p className={"order-btn-admin"}>Orders</p></Link>
                    <button className={"logout-btn-admin"} onClick={handleLogout}>Log out</button>
                </div>

                <div className="adminHeader-sidenav" style={{ width: sidenavWidth }}>
                    <div className={"adminHeader-sideNav-btn-container"}>
                        <Link to="/adminCustomer"><button className={"adminHeader-sideNav-btn"}>Customer</button></Link>
                        <button className={"adminHeader-sideNav-btn"} onClick={() => setSideNavDropDownVisible(!isSideNavDropDownVisible)}>Products <FontAwesomeIcon icon={faCaretDown} /></button>

                        {isSideNavDropDownVisible && (
                            <div className={"adminHead-sideNav-product-options-div"}>
                                <Link to="/adminFoliage"><button className={"adminHeader-sideNav-productBtn"}>Foliage </button></Link>
                                <Link to="/adminSucculent"><button className={"adminHeader-sideNav-productBtn"}>Succulents</button></Link>
                                <Link to="/adminCactus"><button className={"adminHeader-sideNav-productBtn"}>Cacti</button></Link>
                                <Link to="/adminFlower"><button className={"adminHeader-sideNav-productBtn"}>FLowering</button></Link>
                                <Link to="/adminHerb"><button className={"adminHeader-sideNav-productBtn"}>Herb</button></Link>
                                <Link to="/productAnalytics"><button className={"adminHeader-sideNav-productBtn"}>Product analytics</button></Link>
                            </div>
                        )}

                        <Link to="/adminOrder"><button className={"adminHeader-sideNav-btn"}>Orders</button></Link>
                        <button className={"adminHeader-sideNav-btn"} onClick={handleLogout}>Log out</button>

                    </div>
                </div>

                <div className="adminHeader-openSideNav-btn-div" onClick={toggleNav}>
                    <button className="adminHeader-openSideNav-btn"><FontAwesomeIcon icon={faBars} /></button>
                </div>
            </div>
        </>
    )
}
export default HeaderAdmin;