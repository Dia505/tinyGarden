import "../css-files/Succulent.css"
import HeaderUser from "./HeaderUser.tsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import HeaderUserBeforeLogin from "./HeaderUserBeforeLogin.tsx";
function Succulent() {
    const [succulentPlants, setSucculentPlants] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSucculentPlants = async () => {
            try {
                const response = await axios.get("http://localhost:8080/plant/get-by-type/succulent");
                setSucculentPlants(response.data);
            }
            catch(error) {
                console.error("Error fetching succulent plants: ",error);
            }
        };

        fetchSucculentPlants()
    }, []);
    return (
        <>
            {localStorage.getItem("loggedInUserId")? <HeaderUser/>:<HeaderUserBeforeLogin/>}

            <div className={"centre-succulent"}>
                <div className={"top-section-succulent"}>
                    <p className={"title-succulent"}>Succulents</p>
                </div>
            </div>

            <div className={"succulent-grid"}>
                {succulentPlants.map((plant) => (
                    <div className={"succulent-container"} key={plant.plantId}>
                        <img
                            className={"succulent-img"}
                            src={`/${plant.image}`}
                            onClick={() => {
                                navigate("/productView/" + plant.plantId)
                            }}
                        />
                        <p className={"succulent-name"}>{plant.plantName}</p>
                        <p className={"succulent-price"}>Rs. {plant.price}</p>
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
export default Succulent;