import HeaderAdmin from "./HeaderAdmin.tsx";
import "../css-files/AdminFoliage.css"
import AddProductForm from "./AddProductForm.tsx";
import {useEffect, useState, useRef} from "react";
import axios from "axios";
import EditProductForm from "./EditProductForm.tsx";
import {useForm} from "react-hook-form";
function AdminFoliage() {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [foliagePlants, setFoliagePlants] = useState([]);
    const { setValue } = useForm();
    const [plantDetails, setPlantDetails] = useState({});

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

    const addFormRef = useRef(null);
    const editFormRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const addForm = addFormRef.current;
            const editForm = editFormRef.current;

            if (addForm && !addForm.contains(event.target) && event.target.className !== "add-btn-adFoliage") {
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

    return (
        <>
            <HeaderAdmin/>

            <div className={"centre-adFoliage"}>
                <div className={"top-section-adFoliage"}>
                    <p className={"title-adFoliage"}>Foliage plants</p>
                    <button className={"add-btn-adFoliage"} onClick={() => {
                        setAddFormVisible(!isAddFormVisible);
                    }}>Add product</button>
                </div>

                {isAddFormVisible && (
                    <div className={"addForm-container-adFoliage"} ref={addFormRef}>
                        <AddProductForm />
                    </div>
                )}

                {isEditFormVisible && (
                    <div className={"editForm-container-adFoliage"} ref={editFormRef}>
                        <EditProductForm plantDetilFromAdminPage={plantDetails} />
                    </div>
                )}

                <div className={"adfoliage-grid"}>
                    {foliagePlants.map((plant) => (
                        <div className={"adfoliage-container"} key={plant.plantId}>
                            <img
                                className={"adfoliage-img"}
                                src={`/${plant.image}`}
                                onClick={() => {
                                    handleEditClick(plant.plantId);
                                }}
                            />
                            <p className={"adfoliage-name"}>{plant.plantName}</p>
                            <p className={"adfoliage-price"}>Rs. {plant.price}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}
export default AdminFoliage;