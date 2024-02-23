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
                        <Link to={"/foliage"}><div className={"div-category"}>
                            <img className={"img-category"} src={"src/assets/categories/foliageCat.jpg"}/>
                            <p className={"name-category"}>Foliage Plants</p>
                        </div></Link>

                        <Link to={"/succulent"}><div className={"div-category"}>
                            <img className={"img-category"} src={"src/assets/categories/succulentCat.jpg"}/>
                            <p className={"name-category"}>Succulents</p>
                        </div></Link>

                        <Link to={"/cactus"}><div className={"div-category"}>
                            <img className={"img-category"} src={"src/assets/categories/cactusCat.jpg"}/>
                            <p className={"name-category"}>Cacti</p>
                        </div></Link>
                    </div>

                    <div className={"category-grid-row2"}>
                        <Link to={"/flower"}><div className={"div-category"}>
                            <img className={"img-category"} src={"src/assets/categories/flowerCat.jpg"}/>
                            <p className={"name-category"}>Flowering Plants</p>
                        </div></Link>

                        <Link to={"/herb"}><div className={"div-category"}>
                            <img className={"img-category"} src={"src/assets/categories/herbCat.jpg"}/>
                            <p className={"name-category"}>Herbs</p>
                        </div></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Categories;