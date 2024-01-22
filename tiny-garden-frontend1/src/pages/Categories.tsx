import "../css-files/Categories.css"
import HeaderUser from "./HeaderUser.tsx";
import {Link} from "react-router-dom";
function Categories() {
    return (
        <>
            <HeaderUser/>

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

                        <div className={"succulent-div-category"}>
                            <img className={"succulent-img-category"} src={"src/assets/categories/succulent.png"}/>
                            <p className={"succulent-text-category"}>Succulents</p>
                        </div>

                        <div className={"cactus-div-category"}>
                            <img className={"cactus-img-category"} src={"src/assets/categories/cactus.png"}/>
                            <p className={"cactus-text-category"}>Cacti</p>
                        </div>
                    </div>

                    <div className={"category-grid-row2"}>
                        <div className={"flower-div-category"}>
                            <img className={"flowering-img-category"} src={"src/assets/categories/flowering.png"}/>
                            <p className={"flowering-text-category"}>Flowering Plants</p>
                        </div>

                        <div className={"herb-div-category"}>
                            <img className={"herb-img-category"} src={"src/assets/categories/herb.png"}/>
                            <p className={"herb-text-category"}>Herbs</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Categories;