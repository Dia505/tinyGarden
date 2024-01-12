import "../css-files/HeaderAdmin.css"
function HeaderAdmin() {
    return (
        <>
            <div className={"header-admin"}>
                <div className={"right-section-admin"}>
                    <img className={"logo-admin"} src={"src/assets/logo2.png"}/>
                </div>
                <div className={"left-section-admin"}>
                    <p className={"customer-btn-admin"}>Customers</p>


                    <div className={"product-admin-container"}>
                        <p className={"product-btn-admin"}>Products
                            <div className={"product-drop-down-admin"}>
                                <button className={"drop-down-foliage"}>Foliage</button>
                                <button className={"drop-down-succulent"}>Succulents</button>
                                <button className={"drop-down-cactus"}>Cacti</button>
                                <button className={"drop-down-flowering"}>Flowering</button>
                                <button className={"drop-down-herb"}>Herbs</button>
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