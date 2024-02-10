import "../css-files/Cactus.css"
import HeaderUser from "./HeaderUser.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import HeaderUserBeforeLogin from "./HeaderUserBeforeLogin.tsx";
function Cactus() {
    const [cactusPlants, setCactusPlants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCactusPlants = async () => {
            try {
                const response = await axios.get("http://localhost:8080/plant/get-by-type/cactus");
                setCactusPlants(response.data);
            }
            catch(error) {
                console.error("Error fetching cactus: ",error);
            }
        };

        fetchCactusPlants()
    }, []);
    return (
        <>
            {localStorage.getItem("loggedInUserId")? <HeaderUser/>:<HeaderUserBeforeLogin/>}

            <div className={"centre-cactus"}>
                <div className={"top-section-cactus"}>
                    <p className={"title-cactus"}>Cacti</p>
                </div>
            </div>

            <div className={"cactus-grid"}>
                {cactusPlants.map((plant) => (
                    <div className={"cactus-container"} key={plant.plantId}>
                        <img
                            className={"cactus-img"}
                            src={`/${plant.image}`}
                            onClick={() => {
                                navigate("/productView/" + plant.plantId)
                            }}
                        />
                        <p className={"cactus-name"}>{plant.plantName}</p>
                        <p className={"cactus-price"}>Rs. {plant.price}</p>
                    </div>
                ))}
            </div>

            <div className={"other-categories-container-foliage"}>
                <p className={"other-categories-text-foliage"}>Other Categories</p>

                <div className={"category-main-container-foliage"}>
                    <div className={"category-container-foliage"}>
                        <Link to={"/foliage"}><img className={"category-img-foliage"} src={"src/assets/foliage/foliage.png"}/></Link>
                        <p className={"category-text-foliage"}>Foliage plants</p>
                    </div>

                    <div className={"category-container-foliage"}>
                        <Link to={"/succulent"}><img className={"category-img-foliage"} src={"src/assets/succulent/succulents.png"}/></Link>
                        <p className={"category-text-foliage"}>Succulents</p>
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
export default Cactus;