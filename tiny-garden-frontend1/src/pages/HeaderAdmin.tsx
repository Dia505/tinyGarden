import "../css-files/HeaderAdmin.css"
import {Link} from "react-router-dom";
function HeaderAdmin() {
    return (
        <>
            <div className={"header-admin"}>
                <div className={"right-section-admin"}>
                    <img className={"logo-admin"} src={"src/assets/logo2.png"}/>
                </div>
                <div className={"left-section-admin"}>
                    <Link to={"/adminCustomer"}><p className={"customer-btn-admin"}>Customers</p></Link>

                    <div className={"product-admin-container"}>
                        <p className={"product-btn-admin"}>Products
                            <div className={"product-drop-down-admin"}>
                                <Link to={"/adminFoliage"}><button className={"drop-down-btn"}>Foliage</button></Link>
                                <button className={"drop-down-btn"}>Succulents</button>
                                <button className={"drop-down-btn"}>Cacti</button>
                                <button className={"drop-down-btn"}>Flowering</button>
                                <button className={"drop-down-btn"}>Herbs</button>
                                <button className={"drop-down-btn"}>Analytics</button>
                            </div>
                        </p>
                    </div>

                    <p className={"order-btn-admin"}>Orders</p>
                    <button className={"logout-btn-admin"}>Log out</button>
                </div>
            </div>
        </>
    )
}
export default HeaderAdmin;