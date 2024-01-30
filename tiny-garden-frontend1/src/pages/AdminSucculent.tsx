import "../css-files/AdminSucculent.css"
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useQuery} from "react-query";
import HeaderAdmin from "./HeaderAdmin.tsx";
import AddProductForm from "./AddProductForm.tsx";
import EditProductForm from "./EditProductForm.tsx";

function AdminSucculent() {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [succulentPlants, setSucculentPlants] = useState([]);
    const { setValue } = useForm();
    const [plantDetails, setPlantDetails] = useState({});

    const fetchSucculentPlants = async () => {
        try {
            const response = await axios.get("http://localhost:8080/plant/get-by-type/succulent");
            setSucculentPlants(response.data);
        }
        catch(error) {
            console.error("Error fetching succulent plants: ",error);
        }
    };

    useEffect(() => {
        fetchSucculentPlants()
    }, []);

    const { refetch: refetchSucculentPlants } = useQuery("succulentPlants", fetchSucculentPlants);

    const addFormRef = useRef(null);
    const editFormRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const addForm = addFormRef.current;
            const editForm = editFormRef.current;

            if (addForm && !addForm.contains(event.target) && event.target.className !== "add-btn-adSucculent") {
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
        await refetchSucculentPlants();

        setAddFormVisible(false);
    };

    const handleEditFormSubmit = async () => {
        await refetchSucculentPlants();

        setEditFormVisible(false);
    };

    return (
        <>
            <HeaderAdmin/>

            <div className={"centre-adSucculent"}>
                <div className={"top-section-adSucculent"}>
                    <p className={"title-adSucculent"}>Succulents</p>
                    <button className={"add-btn-adSucculent"} onClick={() => {
                        setAddFormVisible(!isAddFormVisible);
                    }}>Add product</button>
                </div>

                {isAddFormVisible && (
                    <div className={"addForm-container-adSucculent"} ref={addFormRef}>
                        <AddProductForm onSubmit={handleAddFormSubmit} />
                    </div>
                )}

                {isEditFormVisible && (
                    <div className={"editForm-container-adSucculent"} ref={editFormRef}>
                        <EditProductForm plantDetilFromAdminPage={plantDetails} onSubmit={handleAddFormSubmit} />
                    </div>
                )}

                <div className={"adSucculent-grid"}>
                    {succulentPlants.map((plant) => (
                        <div className={"adSucculent-container"} key={plant.plantId}>
                            <img
                                className={"adSucculent-img"}
                                src={`/${plant.image}`}
                                onClick={() => {
                                    handleEditClick(plant.plantId);
                                }}
                            />
                            <p className={"adSucculent-name"}>{plant.plantName}</p>
                            <p className={"adSucculent-price"}>Rs. {plant.price}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default AdminSucculent;