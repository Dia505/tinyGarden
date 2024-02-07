import "../css-files/HeaderUserBeforeLogin.css"
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

function HeaderUserBeforeLogin() {
    const [sidenavWidth, setSidenavWidth] = useState<string>('0');

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

    return (
        <>
            <div className={"header"}>
                <div className={"logo-container"}>
                    <img className={"logo"} src={window.location.origin +"/src/assets/home/logo.png"}/>
                </div>
                <div className={"header-button-container"}>
                    <Link to={"/"}><p className={"header-button"}>Home</p></Link>
                    <Link to={"/categories"}><p className={"header-button"}>Plants</p></Link>
                    <img className={"cart-btn"} src={window.location.origin +"/src/assets/home/cart.png"}/>

                    <Link to={"/login"}><button className={"login-button"}>Login</button></Link>
                </div>

                <div className="header-sidenav" style={{ width: sidenavWidth }}>
                    <div className={"header-sideNav-btn-container"}>
                        <Link to="/"><button className={"header-sideNav-btn"}>Home</button></Link>
                        <Link to={"/categories"}><button className={"header-sideNav-btn"}>Products</button></Link>
                        <Link to="/admin "><button className={"adminHeader-sideNav-btn"}>Orders</button></Link>
                        <Link to="/login "><button className={"adminHeader-sideNav-btn"}>Login</button></Link>

                    </div>
                </div>

                <div className="header-openSideNav-btn-div" onClick={toggleNav}>
                    <button className="header-openSideNav-btn"><FontAwesomeIcon icon={faBars} /></button>
                </div>
            </div>
        </>
    )
}
export default HeaderUserBeforeLogin;