import "../css-files/AddProductForm.css"
function AddProductForm() {
    return (
        <>
            <div className={"addForm-main-container"}>
                <form>
                    <div className={"addForm-sub-container"}>
                        <div className={"addForm-left-section"}>
                            <label className={"image-upload-label"} htmlFor={"productImageId"}>
                                <div className={"image-upload-container"}>
                                    <p className={"add-image-text"}>ADD IMAGE</p>
                                </div>
                            </label>
                            <input id={"productImageId"} type={"file"} className={"product-image-input"}/>
                        </div>

                        <div className={"addForm-right-section"}>
                            <div className={"produt-name-price-container"}>
                                <input className={"product-name-price-input"} placeholder={"Name of plant"}/>
                                <input className={"product-name-price-input"} placeholder={"Price"}/>
                            </div>

                            <hr className={"addForm-divider"}></hr>

                            <div className={"product-desc-container"}>
                                <p className={"product-desc-text"}>Description</p>
                                <input className={"product-desc-input"}/>
                            </div>

                            <div className={"add-btn-container"}>
                                <button className={"add-btn-product"}>Add product</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default AddProductForm;