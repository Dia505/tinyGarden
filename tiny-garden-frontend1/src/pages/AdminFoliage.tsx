import HeaderAdmin from "./HeaderAdmin.tsx";
import "../css-files/AdminFoliage.css"
import AddProductForm from "./AddProductForm.tsx";
import {useEffect, useState} from "react";
function AdminFoliage() {
    const [isAddFormVisible, setAddFormVisible] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event) => {
            const addForm = document.querySelector(".addForm-container-adFoliage");
            const addButton = document.querySelector(".add-btn-adFoliage");

            if (addForm && !addForm.contains(event.target) && addButton !== event.target) {
                setAddFormVisible(false);
            }
        };

        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, [setAddFormVisible]);

    return (
        <>
            <HeaderAdmin/>

            <div className={"centre-adFoliage"}>
                <div className={"top-section-adFoliage"}>
                    <p className={"title-adFoliage"}>Foliage plants</p>
                    <button className={"add-btn-adFoliage"} onClick={() => {
                        setAddFormVisible(!isAddFormVisible);
                        console.log("isAddFormVisible:", isAddFormVisible);
                    }}>Add product</button>
                </div>

                {isAddFormVisible && (
                    <div className={"addForm-container-adFoliage"}>
                        <AddProductForm/>
                    </div>
                )}
            </div>
        </>
    )
}
export default AdminFoliage;