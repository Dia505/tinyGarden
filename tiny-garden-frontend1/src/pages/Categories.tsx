import "../css-files/Categories.css"
import HeaderUser from "./HeaderUser.tsx";
import {Link} from "react-router-dom";
import HeaderUserBeforeLogin from "./HeaderUserBeforeLogin.tsx";
function Categories() {
    return (
        <>
            {localStorage.getItem("loggedInUserId")? <HeaderUser/>:<HeaderUserBeforeLogin/>}

            <div className={"centre-category"}>
                <div className={"category-title-container"}>
                    <p className={"category-title-text"}>Categories</p>
                </div>
                <div className={"category-grid"}>
                    <div className={"category-grid-row1"}>
                        <Link to={"/foliage"}><div className={"foliage-div-category"}>
                            <img className={"foliage-img-category"} src={"src/assets/categories/foliage.png"}/>
                            <p className={"foliage-text-category"}>Foliage Plants</p>
                        </div></Link>

                        <Link to={"/succulent"}><div className={"succulent-div-category"}>
                            <img className={"succulent-img-category"} src={"src/assets/categories/succulent.png"}/>
                            <p className={"succulent-text-category"}>Succulents</p>
                        </div></Link>

                        <Link to={"/cactus"}><div className={"cactus-div-category"}>
                            <img className={"cactus-img-category"} src={"src/assets/categories/cactus.png"}/>
                            <p className={"cactus-text-category"}>Cacti</p>
                        </div></Link>
                    </div>

                    <div className={"category-grid-row2"}>
                        <Link to={"/flower"}><div className={"flower-div-category"}>
                            <img className={"flowering-img-category"} src={"src/assets/categories/flowering.png"}/>
                            <p className={"flowering-text-category"}>Flowering Plants</p>
                        </div></Link>

                        <Link to={"/herb"}><div className={"herb-div-category"}>
                            <img className={"herb-img-category"} src={"src/assets/categories/herb.png"}/>
                            <p className={"herb-text-category"}>Herbs</p>
                        </div></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Categories;