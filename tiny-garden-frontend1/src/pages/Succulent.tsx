import "../css-files/Succulent.css"
import HeaderUser from "./HeaderUser.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
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
            <HeaderUser/>

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
        </>
    )
}
export default Succulent;