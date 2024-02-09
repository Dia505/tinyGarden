import "../css-files/ProductAnalytics.css"
import {useQuery} from "react-query";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSeedling } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from "react";

interface DataRecord {
    totalRecords: number;
}

function ProductAnalytics() {
    const [plantId, setPlantId] = useState("");
    const [plantRecords, setPlantRecords] = useState<DataRecord | null>(null);

    const {data: allPlantData} = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/plant/get-all-data", {
                headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
            })
        }
    })

    const { data: plantByIdData } = useQuery(
        ["GETDATA", plantId],
        async () => {
            if (plantId.trim() !== "") {
                const response = await axios.get(
                    `http://localhost:8080/plant/get-by-id/${plantId}`, {
                        headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
                    }
                );
                return response.data;
            }
            return null;
        },
        {
            enabled: plantId.trim() !== "",
        }
    );

    const handleInputChange = (e) => {
        setPlantId(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const plantResponse = await axios.get('http://localhost:8080/plant/plant-record', {
                    headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
                });
                setPlantRecords(plantResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <HeaderAdmin/>

            <div className={"centre-adPlant"}>
                <p className={"page-heading-adPlant"}>Product Details</p>

                <div className={"admin-plant-record-container"}>
                    <FontAwesomeIcon className={"plant-record-icon"} icon={faSeedling}/>
                    <div className={"admin-plant-records"}>
                        <p className={"plant-registered-text"}>Types of plants in store</p>
                        <h1 className={"plant-number-data"} id="admin-dashboard-data">{plantRecords?.totalRecords}</h1>
                    </div>
                </div>

                <div className={"search-container-adPlant"}>
                    <input className={"search-bar-adPlant"}
                           placeholder={"Enter product id"}
                           value={plantId}
                           onChange={handleInputChange}/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={"search-btn-adPlant"}/>
                </div>

                <table className={"table-adPlant"}>
                    <thead>
                    <tr>
                        <td>Id</td>
                        <td>Product name</td>
                        <td>Type</td>
                        <td>Price</td>
                        <td>Scientific name</td>
                        <td>Light requirement</td>
                        <td>Water requirement</td>
                        <td>Pet friendly</td>
                        <td>Additional feature</td>
                    </tr>
                    </thead>

                    <tbody>
                    {plantId.trim() === "" ?
                        allPlantData?.data?.map((plant) => (
                            <tr key={plant.id}>
                                <td>{plant.plantId}</td>
                                <td>{plant.plantName}</td>
                                <td>{plant.type}</td>
                                <td>{plant.price}</td>
                                <td>{plant.sciName}</td>
                                <td>{plant.lightReq}</td>
                                <td>{plant.waterReq}</td>
                                <td>{plant.petFriendly}</td>
                                <td>{plant.addFeature}</td>
                            </tr>
                        )) : (
                            plantByIdData ? (
                                <tr key={plantByIdData.id}>
                                    <td>{plantByIdData.plantId}</td>
                                    <td>{plantByIdData.plantName}</td>
                                    <td>{plantByIdData.type}</td>
                                    <td>{plantByIdData.price}</td>
                                    <td>{plantByIdData.sciName}</td>
                                    <td>{plantByIdData.lightReq}</td>
                                    <td>{plantByIdData.waterReq}</td>
                                    <td>{plantByIdData.petFriendly}</td>
                                    <td>{plantByIdData.addFeature}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="10">Product not found</td>
                                </tr>
                            )
                        )}
                    </tbody>

                </table>
            </div>
        </>
    )
}
export default ProductAnalytics;