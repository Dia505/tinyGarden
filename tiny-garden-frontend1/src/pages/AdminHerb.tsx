import "../css-files/AdminHerb.css"
import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useQuery} from "react-query";
import HeaderAdmin from "./HeaderAdmin.tsx";
import AddProductForm from "./AddProductForm.tsx";
import EditProductForm from "./EditProductForm.tsx";
function AdminHerb() {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [herbPlants, setHerbPlants] = useState([]);
    const { setValue } = useForm();
    const [plantDetails, setPlantDetails] = useState({});

    const fetchHerbPlants = async () => {
        try {
            const response = await axios.get("http://localhost:8080/plant/get-by-type/herb");
            setHerbPlants(response.data);
        }
        catch(error) {
            console.error("Error fetching herbs: ",error);
        }
    };

    useEffect(() => {
        fetchHerbPlants()
    }, []);

    const { refetch: refetchHerbPlants } = useQuery("herbs", fetchHerbPlants);

    const addFormRef = useRef(null);
    const editFormRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const addForm = addFormRef.current;
            const editForm = editFormRef.current;

            if (addForm && !addForm.contains(event.target) && event.target.className !== "add-btn-adHerb") {
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
        await refetchHerbPlants();

        setAddFormVisible(false);
    };

    const handleEditFormSubmit = async () => {
        await refetchHerbPlants();

        setEditFormVisible(false);
    };

    return (
        <>
            <HeaderAdmin/>

            <div className={"centre-adHerb"}>
                <div className={"top-section-adHerb"}>
                    <p className={"title-adHerb"}>Herbs</p>
                    <button className={"add-btn-adHerb"} onClick={() => {
                        setAddFormVisible(!isAddFormVisible);
                    }}>Add product</button>
                </div>

                {isAddFormVisible && (
                    <div className={"addForm-container-adHerb"} ref={addFormRef}>
                        <AddProductForm onSubmit={handleAddFormSubmit} />
                    </div>
                )}

                {isEditFormVisible && (
                    <div className={"editForm-container-adHerb"} ref={editFormRef}>
                        <EditProductForm plantDetilFromAdminPage={plantDetails} onSubmit={handleEditFormSubmit}/>
                    </div>
                )}

                <div className={"adHerb-grid"}>
                    {herbPlants.map((plant) => (
                        <div className={"adHerb-container"} key={plant.plantId}>
                            <img
                                className={"adHerb-img"}
                                src={`/${plant.image}`}
                                onClick={() => {
                                    handleEditClick(plant.plantId);
                                }}
                            />
                            <p className={"adHerb-name"}>{plant.plantName}</p>
                            <p className={"adHerb-price"}>Rs. {plant.price}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}
export default AdminHerb;