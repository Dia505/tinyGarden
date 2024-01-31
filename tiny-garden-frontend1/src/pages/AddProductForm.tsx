import "../css-files/AddProductForm.css"
import {useMutation, useQuery} from "react-query";
import axios from "axios";
import {useState} from "react";
import {useForm} from "react-hook-form";

interface AddProductFormProps {
    onSubmit: () => Promise<void>;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit }) => {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const [selectedType, setSelectedType] = useState("");
    const [selectedLightReq, setSelectedLightReq] = useState("");
    const [selectedWaterReq, setSelectedWaterReq] = useState("");
    const [selectedPetF, setSelectedPetF] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);

    const savePlant = useMutation({
        mutationKey: "SAVE_PLANT",
        mutationFn: async (requestData: any) => {
            try {
                const formData = new FormData();
                formData.append("image", requestData.image[0]);
                formData.append("plantName", requestData.plantName);
                formData.append("type", requestData.type);
                formData.append("price", requestData.price);
                formData.append("sciName", requestData.sciName);
                formData.append("lightReq", requestData.lightReq);
                formData.append("waterReq", requestData.waterReq);
                formData.append("petFriendly", requestData.petFriendly);
                formData.append("addFeature", requestData.addFeature);

                const response = await axios.post("http://localhost:8080/plant/save-plant-details", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                console.log(response);
                return response.data;
            }
            catch (error) {
                console.log("Error uploading file: ",error);
            }
        },
        onSuccess: () => {
            setAddFormVisible(false);
            alert("The plant has been registered!");
        }
    })

    const clearAddForm = () => {
        setValue("plantName", "");
        setValue("type", "");
        setValue("price", "");
        setValue("sciName", "");
        setValue("lightReq", "");
        setValue("waterReq", "");
        setValue("petFriendly", "");
        setValue("addFeature", "");
    }

    const onSubmitAddPlant = (formData: any): void => {
        formData.type = selectedType;
        formData.lightReq = selectedLightReq;
        formData.waterReq = selectedWaterReq;
        formData.petFriendly = selectedPetF;
        savePlant.mutate(formData);
        clearAddForm();
        onSubmit();
    }

    return (
        <>
            <div className={"addForm-main-container"}>
                <form onSubmit={handleSubmit(onSubmitAddPlant)}>
                    <div className={"addForm-sub-container"}>
                        <div className={"addForm-left-section"}>
                            <label className={"image-upload-label"} htmlFor={"productImageId"}>
                                <div className={"image-upload-container"}>
                                    {selectedImage ? (
                                        <img
                                            className={"addForm-image"}
                                            src={selectedImage}
                                            alt="Selected Image"
                                        />
                                    ) : (
                                        <p className={"add-image-text"}>ADD IMAGE</p>
                                    )}
                                </div>
                            </label>
                            <input id={"productImageId"}
                                   type={"file"}
                                   className={"product-image-input"}
                                   {...register("image", {
                                       onChange: (e) => {
                                           const file = e.target.files[0];
                                           if(file) {
                                               const imageUrl = URL.createObjectURL(file);
                                               setSelectedImage(imageUrl);
                                           }
                                       }
                                   })}/>
                        </div>

                        <div className={"addForm-right-section"}>
                            <div className={"produt-name-price-container"}>
                                <input className={"product-input"} placeholder={"Name of plant"} {...register("plantName")}/>
                                <input className={"product-input"} placeholder={"Price"} {...register("price")}/>
                            </div>

                            <hr className={"addForm-divider"}></hr>

                            <div className={"product-desc-container"}>
                                <p className={"product-desc-text"}>Description</p>
                                <div className={"product-desc-input-container"}>
                                    <select className="plant-dropdown" value={selectedType}
                                            onChange={(e) => setSelectedType(e.target.value)}>
                                        {selectedType === "" && <option value="" disabled>Select type</option>}
                                        <option value="foliage">foliage</option>
                                        <option value="succulent">succulent</option>
                                        <option value="cactus">cactus</option>
                                        <option value="flowering">flowering</option>
                                        <option value="herb">herb</option>
                                    </select>

                                    <input className={"product-input"} placeholder={"Scientific name"} {...register("sciName")}/>

                                    <div className={"light-water-req-container"}>
                                        <select className="req-dropdown" value={selectedLightReq}
                                                onChange={(e) => setSelectedLightReq(e.target.value)}>
                                            {selectedLightReq === "" && <option value="" disabled>Select light requirement</option>}
                                            <option value="low">low</option>
                                            <option value="moderate">moderate</option>
                                            <option value="high">high</option>
                                        </select>

                                        <select className="req-dropdown" value={selectedWaterReq}
                                                onChange={(e) => setSelectedWaterReq(e.target.value)}>
                                            {selectedWaterReq === "" && <option value="" disabled>Select water requirement</option>}
                                            <option value="low">low</option>
                                            <option value="moderate">moderate</option>
                                            <option value="high">high</option>
                                        </select>
                                    </div>

                                    <select className="plant-dropdown" value={selectedPetF}
                                            onChange={(e) => setSelectedPetF(e.target.value)}>
                                        {selectedPetF === "" && <option value="" disabled>Pet friendly</option>}
                                        <option value="yes">yes</option>
                                        <option value="no">no</option>
                                    </select>
                                    <input className={"product-input"} placeholder={"Addition feature"} {...register("addFeature")}/>
                                </div>
                            </div>

                            <div className={"add-btn-container"}>
                                <button className={"add-btn-product"} type={"submit"}>Add product</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddProductForm;