import "../css-files/Herb.css"
import HeaderUser from "./HeaderUser.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
function Herb() {
    const [herbPlants, setHerbPlants] = useState([]);

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
            <HeaderUser/>

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
                        />
                        <p className={"herb-name"}>{plant.plantName}</p>
                        <p className={"herb-price"}>Rs. {plant.price}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Herb;