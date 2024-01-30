import "../css-files/EditProductForm.css"
import HeaderAdmin from "./HeaderAdmin.tsx";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import axios from "axios";

export interface DataProps{
    plantDetilFromAdminPage:any
}

interface EditProductFormProps {
    onSubmit: () => Promise<void>;
}

const EditProductForm: React.FC<EditProductFormProps & DataProps> = ({ onSubmit, plantDetilFromAdminPage }: EditProductFormProps & DataProps) => {
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const [selectedType, setSelectedType] = useState("");
    const [selectedLightReq, setSelectedLightReq] = useState("");
    const [selectedWaterReq, setSelectedWaterReq] = useState("");
    const [selectedPetF, setSelectedPetF] = useState("");
    const [plantDetails, setPlantDetails] = useState(plantDetilFromAdminPage);
    const { register, handleSubmit, setValue } = useForm({defaultValues:plantDetails,values:plantDetails});

    useEffect(() => {
        if (isEditFormVisible && plantDetails && plantDetails.plantId) {
        setSelectedType(plantDetails?.type);
        setSelectedLightReq(plantDetails?.lightReq);
        setSelectedWaterReq(plantDetails?.waterReq);
        setSelectedPetF(plantDetails?.petFriendly);
        }
        else {
            setSelectedType("foliage");
            setSelectedLightReq("low");
            setSelectedWaterReq("low");
            setSelectedPetF("no");
        }
    }, [isEditFormVisible, plantDetails, setSelectedType, setSelectedLightReq, setSelectedWaterReq, setSelectedPetF]);

    const deletePlant = useMutation({
        mutationKey: ["DELETE PLANT"],
        mutationFn: async (plantId: number) => {
            await axios.delete(`http://localhost:8080/plant/delete-by-id/${plantId}`);
        },
        onSuccess: () => {
            setEditFormVisible(false);
            alert("The product has been deleted");
        }
    });

    const editPlant = useMutation({
        mutationKey: "UPDATE_PLANT",
        mutationFn: async (requestData: any) => {
            console.log(requestData);
            try {
                const formData = new FormData();
                if(requestData.image && requestData.image.length > 0) {
                    formData.append("image", requestData.image[0]);
                }
                formData.append("plantName", requestData.plantName);
                formData.append("type", requestData.type);
                formData.append("price", requestData.price);
                formData.append("sciName", requestData.sciName);
                formData.append("lightReq", requestData.lightReq);
                formData.append("waterReq", requestData.waterReq);
                formData.append("petFriendly", requestData.petFriendly);
                formData.append("addFeature", requestData.addFeature);
                formData.append("plantId", requestData.plantId);

                const response = await axios.post("http://localhost:8080/plant/update-plant", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
                console.log(response);
                return response.data;
            }
            catch (error) {
                console.error("Error uploading file:", error);
            }
        },
        onSuccess: () => {
            setEditFormVisible(false);
            alert("Plant updated!");
            onSubmit();
        }
    });

    const onSubmitEditPlant = async (formData: any): void => {
        if(formData.image?.length !== 0) {
            editPlant.mutate(formData);
        }
        else {
            delete formData?.image;
            const response = await axios.post("http://localhost:8080/plant/update-plant-without-image", formData);
            console.log(response);
            setEditFormVisible(false);
            alert("Plant details updated!");
        }
    }

    return (
        <>
            <HeaderAdmin/>

            <div className={"editForm-main-container"}>
                <form onSubmit={handleSubmit(onSubmitEditPlant)}>
                    <div className={"editForm-sub-container"}>
                        <div className={"editForm-left-section"}>
                            <label className={"edit-image-upload-label"} htmlFor={"productImageId"}>
                                <div className={"edit-image-upload-container"}>
                                    <img className={"editForm-image"} src={plantDetails?.image}/>
                                </div>
                            </label>
                            <input id={"productImageId"} type={"file"} className={"product-image-input"} {...register("image")}/>
                        </div>

                        <div className={"editForm-right-section"}>
                            <div className={"edit-product-name-price-container"}>
                                <input className={"edit-product-input"} placeholder={"Name of plant"} {...register("plantName")}/>
                                <input className={"edit-product-input"} placeholder={"Price"} {...register("price")}/>
                            </div>

                            <hr className={"editForm-divider"}></hr>

                            <div className={"edit-product-desc-container"}>
                                <p className={"edit-product-desc-text"}>Description</p>
                                <div className={"edit-product-desc-input-container"}>
                                    <select className="edit-plant-dropdown" value={selectedType}
                                            onChange={(e) => setSelectedType(e.target.value)}>
                                        {selectedType === "" && <option value="" disabled>Select type</option>}
                                        <option value="foliage">foliage</option>
                                        <option value="succulent">succulent</option>
                                        <option value="cacti">cacti</option>
                                        <option value="flowering">flowering</option>
                                        <option value="herb">herb</option>
                                    </select>

                                    <input className={"edit-product-input"} placeholder={"Scientific name"} {...register("sciName")}/>

                                    <div className={"edit-light-water-req-container"}>
                                        <select className="edit-req-dropdown" value={selectedLightReq}
                                                onChange={(e) => setSelectedLightReq(e.target.value)}>
                                            {selectedLightReq === "" && <option value="" disabled>Select light requirement</option>}
                                            <option value="low">low</option>
                                            <option value="moderate">moderate</option>
                                            <option value="high">high</option>
                                        </select>

                                        <select className="edit-req-dropdown" value={selectedWaterReq}
                                                onChange={(e) => setSelectedWaterReq(e.target.value)}>
                                            {selectedWaterReq === "" && <option value="" disabled>Select water requirement</option>}
                                            <option value="low">low</option>
                                            <option value="moderate">moderate</option>
                                            <option value="high">high</option>
                                        </select>
                                    </div>

                                    <select className="edit-plant-dropdown" value={selectedPetF}
                                            onChange={(e) => setSelectedPetF(e.target.value)}>
                                        {selectedPetF === "" && <option value="" disabled>Pet friendly</option>}
                                        <option value="yes">yes</option>
                                        <option value="no">no</option>
                                    </select>
                                    <input className={"edit-product-input"} placeholder={"Addition feature"} {...register("addFeature")}/>
                                </div>
                            </div>

                            <div className={"edit-btn-container"}>
                                <button className={"delete-btn-product"} type={"button"} onClick={() => {
                                    deletePlant.mutate(plantDetails.plantId);
                                }}>Delete</button>
                                <button className={"update-btn-product"} type={"submit"}>Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default EditProductForm;