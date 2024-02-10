import "../css-files/Herb.css"
import HeaderUser from "./HeaderUser.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import HeaderUserBeforeLogin from "./HeaderUserBeforeLogin.tsx";
function Herb() {
    const [herbPlants, setHerbPlants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHerbPlants = async () => {
            try {
                const response = await axios.get("http://localhost:8080/plant/get-by-type/herb");
                setHerbPlants(response.data);
            }
            catch(error) {
                console.error("Error fetching herbs: ",error);
            }
        };

        fetchHerbPlants()
    }, []);
    return (
        <>
            {localStorage.getItem("loggedInUserId")? <HeaderUser/>:<HeaderUserBeforeLogin/>}

            <div className={"centre-herb"}>
                <div className={"top-section-herb"}>
                    <p className={"title-herb"}>Herbs</p>
                </div>
            </div>

            <div className={"herb-grid"}>
                {herbPlants.map((plant) => (
                    <div className={"herb-container"} key={plant.plantId}>
                        <img
                            className={"herb-img"}
                            src={`/${plant.image}`}
                            onClick={() => {
                                navigate("/productView/" + plant.plantId)
                            }}
                        />
                        <p className={"herb-name"}>{plant.plantName}</p>
                        <p className={"herb-price"}>Rs. {plant.price}</p>
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
                        <Link to={"/flower"}><img className={"category-img-foliage"} src={"src/assets/flowering/flowers.png"}/></Link>
                        <p className={"category-text-foliage"}>Flowering plants</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Herb;