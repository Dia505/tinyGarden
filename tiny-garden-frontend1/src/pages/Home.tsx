import "../css-files/Home.css"
function Home() {
    return (
        <>
            <div className={"header"}>
                <div className={"logo-container"}>
                    <img className={"logo"} src={"src/assets/logo.png"}/>
                </div>
                <div className={"header-button-container"}>
                    <button className={"header-button"}>Home</button>
                    <button className={"header-button"}>Plants</button>
                    <button className={"cart-button"}><img className={"cart-img"} src={"src/assets/cart.png"}/></button>
                    <button className={"login-button"}>Login</button>
                </div>
            </div>

            <div className={"centre"}>
                <div className={"home-heading"}>
                    <div className={"home-heading-img-container"}>
                        <img className={"home-heading-img"} src={"src/assets/home heading.png"}/>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Home;