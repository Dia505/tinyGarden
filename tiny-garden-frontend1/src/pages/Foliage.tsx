import "../css-files/Foliage.css"
import HeaderUser from "./HeaderUser.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
function Foliage() {
    const [foliagePlants, setFoliagePlants] = useState([]);

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
            <HeaderUser/>

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
                        />
                        <p className={"foliage-name"}>{plant.plantName}</p>
                        <p className={"foliage-price"}>Rs. {plant.price}</p>
                    </div>
                ))}
            </div>
        </>
    )
}
export default Foliage;