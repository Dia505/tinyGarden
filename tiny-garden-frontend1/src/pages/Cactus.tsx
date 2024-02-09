import "../css-files/Cactus.css"
import HeaderUser from "./HeaderUser.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
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
            <HeaderUser/>

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
        </>
    )
}
export default Cactus;