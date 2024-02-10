import "../css-files/Foliage.css"
import HeaderUser from "./HeaderUser.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import HeaderUserBeforeLogin from "./HeaderUserBeforeLogin.tsx";
function Foliage() {
    const [foliagePlants, setFoliagePlants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoliagePlants = async () => {
            try {
                const response = await axios.get("http://localhost:8080/plant/get-by-type/foliage");
                setFoliagePlants(response.data);
            }
            catch(error) {
                console.error("Error fetching foliage plants: ",error);
            }
        };

        fetchFoliagePlants()
    }, []);
    return (
        <>
            {localStorage.getItem("loggedInUserId")? <HeaderUser/>:<HeaderUserBeforeLogin/>}

            <div className={"centre-foliage"}>
                <div className={"top-section-foliage"}>
                    <p className={"title-foliage"}>Foliage plants</p>
                </div>
            </div>

            <div className={"foliage-grid"}>
                {foliagePlants.map((plant) => (
                    <div className={"foliage-container"} key={plant.plantId}>
                        <img
                            className={"foliage-img"}
                            src={`/${plant.image}`}
                            onClick={() => {
                                navigate("/productView/" + plant.plantId)
                            }}
                        />
                        <p className={"foliage-name"}>{plant.plantName}</p>
                        <p className={"foliage-price"}>Rs. {plant.price}</p>
                    </div>
                ))}
            </div>

            <div className={"other-categories-container-foliage"}>
                <p className={"other-categories-text-foliage"}>Other Categories</p>

                <div className={"category-main-container-foliage"}>
                    <div className={"category-container-foliage"}>
                        <Link to={"/succulent"}><img className={"category-img-foliage"} src={"src/assets/succulent/succulents.png"}/></Link>
                        <p className={"category-text-foliage"}>Succulents</p>
                    </div>

                    <div className={"category-container-foliage"}>
                        <Link to={"/cactus"}><img className={"category-img-foliage"} src={"src/assets/cacti/cactus.webp"}/></Link>
                        <p className={"category-text-foliage"}>Cacti</p>
                    </div>

                    <div className={"category-container-foliage"}>
                        <Link to={"/flower"}><img className={"category-img-foliage"} src={"src/assets/flowering/flowers.png"}/></Link>
                        <p className={"category-text-foliage"}>Flowering plants</p>
                    </div>

                    <div className={"category-container-foliage"}>
                        <Link to={"/herb"}><img className={"category-img-foliage"} src={"src/assets/herb/herbs.jpg"}/></Link>
                        <p className={"category-text-foliage"}>Herbs</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Foliage;