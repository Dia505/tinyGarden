import "../css-files/HeaderUser.css"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";

function HeaderUser() {
    const [sidenavWidth, setSidenavWidth] = useState<string>('0');
    const navigate = useNavigate();
    const [cartItemCount, setCartItemCount] = useState(0);

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

    useEffect(() => {
        const handleCartUpdate = () => {
            const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            setCartItemCount(cartItems.length);
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    return (
        <>
            <div className={"header"}>
                <div className={"logo-container"}>
                    <img className={"logo"} src={window.location.origin +"/src/assets/home/logo.png"}/>
                </div>
                <div className={"header-button-container"}>
                    <Link to={"/"}><p className={"header-button"}>Home</p></Link>
                    <Link to={"/categories"}><p className={"header-button"}>Plants</p></Link>

                    <div className={"cart-container"}>
                        <Link to={"/order"}><img className={"cart-btn"} src={window.location.origin +"/src/assets/home/cart.png"}/></Link>
                        <p className={"cart-item-number"}>({cartItemCount})</p>
                    </div>

                    <div className={"profile-logout-container"}>
                        <img className={"profile-btn"} src={window.location.origin +"/src/assets/home/profile.png"}/>
                        <button className={"logout-button"} onClick={handleLogout}>Logout</button>
                    </div>
                </div>

                <div className="header-sidenav" style={{ width: sidenavWidth }}>
                    <div className={"header-sideNav-btn-container"}>
                        <Link to="/"><button className={"header-sideNav-btn"}>Home</button></Link>
                        <Link to={"/categories"}><button className={"header-sideNav-btn"}>Products</button></Link>
                        <Link to="/order "><button className={"adminHeader-sideNav-btn"}>Orders</button></Link>
                        <Link to="/profile "><button className={"adminHeader-sideNav-btn"}>Profile</button></Link>
                        <button onClick={handleLogout} className={"adminHeader-sideNav-btn"}>Log out</button>

                    </div>
                </div>

                <div className="header-openSideNav-btn-div" onClick={toggleNav}>
                    <button className="header-openSideNav-btn"><FontAwesomeIcon icon={faBars} /></button>
                </div>
            </div>
        </>
    )
}
export default HeaderUser;