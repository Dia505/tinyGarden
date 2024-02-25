import "../css-files/Profile.css"
import HeaderUser from "./HeaderUser.tsx";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

function Profile() {
    const [customerDetails, setCustomerDetails] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);
    const [isEditProfileFormVisible, setEditProfileFormVisible] = useState(false);
    const customerId = localStorage.getItem('loggedInUserId');

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/customer/get-by-id/${customerId}`, {
                        headers:{"Authorization":"Bearer " + localStorage.getItem("customerToken")}
                    }
                );
                console.log("token: ",localStorage.getItem("customerToken"))
                setCustomerDetails(response.data);
            }
            catch (error) {
                console.error('Error fetching customer details:', error);
            }
        };

        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/order/retrieve-order-by-customerId/${customerId}`, {
                        headers: {"Authorization": "Bearer " + localStorage.getItem("customerToken")}
                    }
                );
                setOrderHistory(response.data);
            }
            catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        if (customerId) {
            fetchCustomerDetails();
            fetchOrderHistory();
        }
    }, []);

    useEffect(() => {
        console.log("Customer details: ",customerDetails);
    }, [customerDetails]);

    useEffect(() => {
        console.log("Order history: ", orderHistory);
    }, [orderHistory]);

    const editProfile = useMutation(async (requestData) => {
        try {
            const response = await axios.post("http://localhost:8080/customer/update-profile", requestData, {
                headers:{"Authorization":"Bearer " + localStorage.getItem("customerToken")}
            });
            console.log(localStorage.getItem("customerToken"));
            return response.data;
        }
        catch (error) {
            throw new Error(error.response.data.message);
        }
    }, {
        onSuccess: () => {
            window.location.reload();
        }
    });

    const { register, handleSubmit } = useForm();

    const onSubmitEditProfile = (data) => {
        data.customerId = customerId;
        editProfile.mutate(data);
    };

    return (
        <>
            <HeaderUser/>

            <div className={"centre-profile"}>
                <div className={"profile-title-container"}>
                    <p className={"profile-title-text"}>Your Account</p>

                    <div className={"profile-detail-edit-container"}>
                        <div className={"profile-details-container"}>
                            <p>{customerDetails?.fullName}</p>
                            <p className={"profile-details-address"}>{customerDetails?.address}</p>
                            <p className={"profile-details-mobile"}>{customerDetails?.mobileNo}</p>
                            <p className={"profile-details-email"}>{customerDetails?.email}</p>
                        </div>

                        <p className={"profile-edit-btn"} onClick={()=>{setEditProfileFormVisible(!isEditProfileFormVisible)}}>Edit</p>
                    </div>
                </div>

                {isEditProfileFormVisible && (
                    <div className={"edit-profile-form-main"}>
                        <form onSubmit={handleSubmit(onSubmitEditProfile)}>
                            <div className={"edit-profile-form"}>
                                <FontAwesomeIcon className={"close-edit-profile-form-button"} icon={faXmark} onClick={() => {setEditProfileFormVisible(!isEditProfileFormVisible)}}/>
                                <p className={"edit-profile-title"}>Edit Your Profile</p>

                                <div className={"edit-profile-textfield-div"}>
                                    <div className={"edit-profile-name-div"}>
                                        <label>Full name:</label>
                                        <input defaultValue={customerDetails?.fullName} {...register("fullName")} />
                                    </div>
                                    <div className={"edit-profile-address-div"}>
                                        <label>Address:</label>
                                        <input defaultValue={customerDetails?.address} {...register("address")} />
                                    </div>
                                    <div className={"edit-profile-number-div"}>
                                        <label>Mobile number:</label>
                                        <input defaultValue={customerDetails?.mobileNo} {...register("mobileNo")} />
                                    </div>
                                    <div className={"edit-profile-email-div"}>
                                        <label>Email address:</label>
                                        <input defaultValue={customerDetails?.email} {...register("email")} />
                                    </div>
                                </div>

                                <button className={"edit-profile-btn"} type={"submit"}>Update</button>
                            </div>
                        </form>
                    </div>
                )}

                <div className={"profile-order-container"}>
                    <p className={"profile-order-history-text"}>Order History</p>

                    <table className={"profile-order-table"}>
                        <thead>
                        <tr>
                            <td>Order</td>
                            <td>Placed on</td>
                            <td>Products</td>
                            <td>Total</td>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(orderHistory) && orderHistory.map(order => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{new Date(order.date).toISOString().split('T')[0]}</td>
                                <td>
                                    {order.orderItems.map((item, i) => (
                                        <span key={i}>{item.plantName}{i !== order.orderItems.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </td>
                                <td>{order.totalPrice}</td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Profile;