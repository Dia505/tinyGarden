import "../css-files/HeaderUser.css"
function HeaderUser() {
    return (
        <>
            <div className={"header"}>
                <div className={"logo-container"}>
                    <img className={"logo"} src={"src/assets/home/logo.png"}/>
                </div>
                <div className={"header-button-container"}>
                    <p className={"header-button"}>Home</p>
                    <p className={"header-button"}>Plants</p>
                    <img className={"cart-btn"} src={"src/assets/home/cart.png"}/>
                    <button className={"login-button"}>Login</button>
                </div>
            </div>
        </>
    )
}
export default HeaderUser;