import "../css-files/ProductView.css"
import HeaderUser from "./HeaderUser.tsx";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import axios from "axios";
function ProductView() {
    const {pk_id} = useParams();

    const {data: dataById} = useQuery({
        queryKey: ["GET_BY_ID", pk_id],
        queryFn() {
            console.log("Image URL:", dataById?.data?.image);
            console.log("API Response:", dataById?.data);
            return axios.get("http://localhost:8080/plant/get-by-id/" + pk_id)
        }, enabled: !!pk_id,
    });

    return (
        <>
            <HeaderUser/>

            <div className={"centre-pView"}>
                <div className={"left-section-pView"}>
                    <img className={"img-pView"} src={dataById?.data?.image}/>
                </div>

                <div className={"right-section-pView"}>
                    <div className={"name-price-container-pView"}>
                        <p className={"name-pView"}>{dataById?.data?.plantName}</p>
                        <p className={"price-description-pView"}>Rs. {dataById?.data?.price}</p>
                    </div>

                    <hr className={"divider-pView"}></hr>

                    <div className={"description-container-pView"}>
                        <p className={"price-description-pView"}>Description</p>
                        <li>Scientific Name: {dataById?.data?.sciName}</li>
                        <li>Requires {dataById?.data?.lightReq} light</li>
                        <li>Requires {dataById?.data?.waterReq} water</li>
                        <li>Pet friendly: {dataById?.data?.petFriendly}</li>
                        <li>{dataById?.data?.addFeature}</li>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductView;