import "../css-files/HeaderUser.css"
import {Link} from "react-router-dom";
function HeaderUser() {
    return (
        <>
            <div className={"header"}>
                <div className={"logo-container"}>
                    <img className={"logo"} src={"src/assets/home/logo.png"}/>
                </div>
                <div className={"header-button-container"}>
                    <Link to={"/"}><p className={"header-button"}>Home</p></Link>
                    <Link to={"/categories"}><p className={"header-button"}>Plants</p></Link>
                    <img className={"cart-btn"} src={"src/assets/home/cart.png"}/>
                    <Link to={"/login"}><button className={"login-button"}>Login</button></Link>
                </div>
            </div>
        </>
    )
}
export default HeaderUser;