import "../css-files/EditProductForm.css"
import HeaderAdmin from "./HeaderAdmin.tsx";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

function EditProductForm() {
    const [isEditFormVisible, setEditFormVisible] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const [selectedType, setSelectedType] = useState("");
    const [selectedLightReq, setSelectedLightReq] = useState("");
    const [selectedWaterReq, setSelectedWaterReq] = useState("");
    const [selectedPetF, setSelectedPetF] = useState("");
    const [plantDetails, setPlantDetails] = useState({});

    useEffect(() => {
        console.log("plantDetails in useEffect:", plantDetails);

        if (isEditFormVisible && plantDetails && plantDetails.plantId) {
            setValue("plantName", plantDetails?.plantName);
            setValue("type", plantDetails?.type);
            setValue("price", plantDetails?.price);
            setValue("sciName", plantDetails?.sciName);
            setValue("lightReq", plantDetails?.lightReq);
            setValue("waterReq", plantDetails?.waterReq);
            setValue("petFriendly", plantDetails?.petFriendly);
            setValue("addFeature", plantDetails?.addFeature);
        } else {
            setValue("plantName", "");
            setValue("type", "foliage");
            setValue("price", "");
            setValue("sciName", "");
            setValue("lightReq", "low");
            setValue("waterReq", "low");
            setValue("petFriendly", "no");
            setValue("plantName", "");
        }
    }, [isEditFormVisible, plantDetails, setValue, setSelectedType, setSelectedLightReq, setSelectedWaterReq, setSelectedPetF]);

    return (
        <>
            <HeaderAdmin/>

            <div className={"editForm-main-container"}>
                <form>
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
                                <button className={"delete-btn-product"} type={"submit"}>Delete</button>
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