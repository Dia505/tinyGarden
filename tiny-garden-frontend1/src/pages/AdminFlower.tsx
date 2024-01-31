import "../css-files/AdminFlower.css"
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useQuery} from "react-query";
import HeaderAdmin from "./HeaderAdmin.tsx";
import AddProductForm from "./AddProductForm.tsx";
import EditProductForm from "./EditProductForm.tsx";
function AdminFlower() {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [floweringPlants, setFloweringPlants] = useState([]);
    const { setValue } = useForm();
    const [plantDetails, setPlantDetails] = useState({});

    const fetchFloweringPlants = async () => {
        try {
            const response = await axios.get("http://localhost:8080/plant/get-by-type/flowering");
            setFloweringPlants(response.data);
        }
        catch(error) {
            console.error("Error fetching flowering plants: ",error);
        }
    };

    useEffect(() => {
        fetchFloweringPlants()
    }, []);

    const { refetch: refetchFloweringPlants } = useQuery("floweringPlants", fetchFloweringPlants);

    const addFormRef = useRef(null);
    const editFormRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const addForm = addFormRef.current;
            const editForm = editFormRef.current;

            if (addForm && !addForm.contains(event.target) && event.target.className !== "add-btn-adFlower") {
                setAddFormVisible(false);
            }

            if (editForm && !editForm.contains(event.target)) {
                setEditFormVisible(false);
            }
        };

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [setAddFormVisible, setEditFormVisible]);

    const handleEditClick = async (plantId) => {
        try {
            const response = await axios.get(`http://localhost:8080/plant/get-by-id/${plantId}`);
            const plantDetails = response.data;
            console.log("Plant details: ", plantDetails);

            setValue("plantId", plantDetails.id);
            setPlantDetails(plantDetails);
        } catch (error) {
            console.error("Error fetching plant details", error);
        }
        setEditFormVisible(!isEditFormVisible);
    };

    const handleAddFormSubmit = async () => {
        await refetchFloweringPlants();

        setAddFormVisible(false);
    };

    const handleEditFormSubmit = async () => {
        await refetchFloweringPlants();

        setEditFormVisible(false);
    };

    return (
        <>
            <HeaderAdmin/>

            <div className={"centre-adFlower"}>
                <div className={"top-section-adFlower"}>
                    <p className={"title-adFlower"}>Flowering plants</p>
                    <button className={"add-btn-adFlower"} onClick={() => {
                        setAddFormVisible(!isAddFormVisible);
                    }}>Add product</button>
                </div>

                {isAddFormVisible && (
                    <div className={"addForm-container-adFlower"} ref={addFormRef}>
                        <AddProductForm onSubmit={handleAddFormSubmit} />
                    </div>
                )}

                {isEditFormVisible && (
                    <div className={"editForm-container-adFlower"} ref={editFormRef}>
                        <EditProductForm plantDetilFromAdminPage={plantDetails} onSubmit={handleEditFormSubmit}/>
                    </div>
                )}

                <div className={"adFlower-grid"}>
                    {floweringPlants.map((plant) => (
                        <div className={"adFlower-container"} key={plant.plantId}>
                            <img
                                className={"adFlower-img"}
                                src={`/${plant.image}`}
                                onClick={() => {
                                    handleEditClick(plant.plantId);
                                }}
                            />
                            <p className={"adFlower-name"}>{plant.plantName}</p>
                            <p className={"adFlower-price"}>Rs. {plant.price}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}
export default AdminFlower;