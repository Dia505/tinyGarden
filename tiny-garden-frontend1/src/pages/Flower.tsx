import "../css-files/Flower.css"
import HeaderUser from "./HeaderUser.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
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
            <HeaderUser/>

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
        </>
    )
}
export default Flower;