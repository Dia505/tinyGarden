import "../css-files/Flower.css"
import HeaderUser from "./HeaderUser.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import HeaderUserBeforeLogin from "./HeaderUserBeforeLogin.tsx";
function Flower() {
    const [floweringPlants, setFloweringPlants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFloweringPlants = async () => {
            try {
                const response = await axios.get("http://localhost:8080/plant/get-by-type/flowering");
                setFloweringPlants(response.data);
            }
            catch(error) {
                console.error("Error fetching flowering plants: ",error);
            }
        };

        fetchFloweringPlants()
    }, []);
    return (
        <>
            {localStorage.getItem("loggedInUserId")? <HeaderUser/>:<HeaderUserBeforeLogin/>}

            <div className={"centre-flower"}>
                <div className={"top-section-flower"}>
                    <p className={"title-flower"}>Flowering plants</p>
                </div>
            </div>

            <div className={"flower-grid"}>
                {floweringPlants.map((plant) => (
                    <div className={"flower-container"} key={plant.plantId}>
                        <img
                            className={"flower-img"}
                            src={`/${plant.image}`}
                            onClick={() => {
                                navigate("/productView/" + plant.plantId)
                            }}
                        />
                        <p className={"flower-name"}>{plant.plantName}</p>
                        <p className={"flower-price"}>Rs. {plant.price}</p>
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
                        <Link to={"/cactus"}><img className={"category-img-foliage"} src={"src/assets/cacti/cactus.webp"}/></Link>
                        <p className={"category-text-foliage"}>Cacti</p>
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
export default Flower;