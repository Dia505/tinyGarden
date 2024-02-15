import "../css-files/Profile.css"
import HeaderUser from "./HeaderUser.tsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useQuery} from "react-query";
function Profile() {
    const [customerDetails, setCustomerDetails] = useState(null);
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const customerId = localStorage.getItem('loggedInUserId');

        const fetchCustomerDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/customer/get-by-id/${customerId}`, {
                        headers:{"Authorization":"Bearer " + localStorage.getItem("customerToken")}
                    }
                );
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
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        };

        if (customerId) {
            fetchCustomerDetails();
            fetchOrderHistory();
        }
    }, []);

    useEffect(() => {
        console.log("Customer details: ", customerDetails);
    }, [customerDetails]);

    useEffect(() => {
        console.log("Order history: ", orderHistory);
    }, [orderHistory]);

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

                        <p className={"profile-edit-btn"}>Edit</p>
                    </div>
                </div>

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
                        {orderHistory.map(order => (
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