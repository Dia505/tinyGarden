import "../css-files/AdminCactus.css"
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useQuery} from "react-query";
import HeaderAdmin from "./HeaderAdmin.tsx";
import AddProductForm from "./AddProductForm.tsx";
import EditProductForm from "./EditProductForm.tsx";
function AdminCactus() {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [cactusPlants, setCactusPlants] = useState([]);
    const { setValue } = useForm();
    const [plantDetails, setPlantDetails] = useState({});

    const fetchCactusPlants = async () => {
        try {
            const response = await axios.get("http://localhost:8080/plant/get-by-type/cactus");
            setCactusPlants(response.data);
        }
        catch(error) {
            console.error("Error fetching cactus: ",error);
        }
    };

    useEffect(() => {
        fetchCactusPlants()
    }, []);

    const { refetch: refetchCactusPlants } = useQuery("cactusPlants", fetchCactusPlants);

    const addFormRef = useRef(null);
    const editFormRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const addForm = addFormRef.current;
            const editForm = editFormRef.current;

            if (addForm && !addForm.contains(event.target) && event.target.className !== "add-btn-adCactus") {
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
        await refetchCactusPlants();

        setAddFormVisible(false);
    };

    const handleEditFormSubmit = async () => {
        await refetchCactusPlants();

        setEditFormVisible(false);
    };

    return (
        <>
            <HeaderAdmin/>

            <div className={"centre-adCactus"}>
                <div className={"top-section-adCactus"}>
                    <p className={"title-adCactus"}>Cacti</p>
                    <button className={"add-btn-adCactus"} onClick={() => {
                        setAddFormVisible(!isAddFormVisible);
                    }}>Add product</button>
                </div>

                {isAddFormVisible && (
                    <div className={"addForm-container-adCactus"} ref={addFormRef}>
                        <AddProductForm onSubmit={handleAddFormSubmit} />
                    </div>
                )}

                {isEditFormVisible && (
                    <div className={"editForm-container-adCactus"} ref={editFormRef}>
                        <EditProductForm plantDetilFromAdminPage={plantDetails} onSubmit={handleEditFormSubmit}/>
                    </div>
                )}

                <div className={"adCactus-grid"}>
                    {cactusPlants.map((plant) => (
                        <div className={"adCactus-container"} key={plant.plantId}>
                            <img
                                className={"adCactus-img"}
                                src={`/${plant.image}`}
                                onClick={() => {
                                    handleEditClick(plant.plantId);
                                }}
                            />
                            <p className={"adCactus-name"}>{plant.plantName}</p>
                            <p className={"adCactus-price"}>Rs. {plant.price}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}
export default AdminCactus;