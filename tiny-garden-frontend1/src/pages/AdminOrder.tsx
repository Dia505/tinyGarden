import "../css-files/AdminOrder.css"
import HeaderAdmin from "./HeaderAdmin.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "react-query";
import axios from "axios";

interface DataRecord {
    totalRecords: number;
}

function AdminOrder() {
    const [orderId, setOrderId] = useState("");
    const [orderRecords, setOrderRecords] = useState<DataRecord | null>(null);

    const {data: allOrderData} = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/order/get-all-order",{
                headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
            })
        }
    })

    const { data: orderByIdData } = useQuery(
        ["GETDATA", orderId],
        async () => {
            if (orderId.trim() !== "") {
                const response = await axios.get(
                    `http://localhost:8080/order/get-by-id/${orderId}`, {
                        headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
                    }
                );
                console.log("order data by id: ",orderByIdData);
                return response.data;

            }
            return null;
        },
        {
            enabled: orderId.trim() !== "",
        }
    );

    const handleInputChange = (e) => {
        setOrderId(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerResponse = await axios.get('http://localhost:8080/order/order-record', {
                    headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
                });
                setOrderRecords(customerResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const deleteOrder = useMutation({
        mutationKey: ["DELETE ORDER"],
        mutationFn: async (orderId: number) => {
            await axios.delete(`http://localhost:8080/order/delete-by-id/${orderId}`, {
                headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
            });
        },
        onSuccess: () => {
            window.location.reload();
        }
    });

    return (
        <>
            <HeaderAdmin/>

            <div className={"centre-adOrder"}>
                <p className={"page-heading-adOrder"}>Order Details</p>

                <div className={"admin-order-record-container"}>
                    <FontAwesomeIcon className={"order-record-icon"} icon={faCartShopping}/>
                    <div className={"admin-order-records"}>
                        <p className={"orders-made-text"}>Orders received</p>
                        <h1 className={"order-number-data"} id="admin-dashboard-data">{orderRecords?.totalRecords}</h1>
                    </div>
                </div>

                <div className={"search-container-adOrder"}>
                    <input className={"search-bar-adOrder"}
                           placeholder={"Enter order id"}
                           value={orderId}
                           onChange={handleInputChange}/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={"search-btn-adOrder"}/>
                </div>

                <table className={"table-adOrder"}>
                    <thead>
                    <tr>
                        <td>Order</td>
                        <td>Placed on</td>
                        <td>Products</td>
                        <td>Total</td>
                        <td>Customer</td>
                    </tr>
                    </thead>

                    <tbody>
                    {orderId.trim() === "" ?
                        allOrderData?.data?.map((order) => (
                            <tr key={order.orderId}>
                                <td>{order.orderId}</td>
                                <td>{new Date(order.date).toISOString().split('T')[0]}</td>
                                <td>
                                    {order.orderItems && order.orderItems.map((item, i) => (
                                        <span key={i}>{item.plantName}{i !== order.orderItems.length - 1 ? ', ' : ''}</span>
                                    ))}
                                </td>
                                <td>{order.totalPrice}</td>
                                <td>{order.customerId}</td>
                                <td className={"delete-order-btn"} onClick={() => {
                                    deleteOrder.mutate(order.orderId);
                                }}>Remove</td>
                            </tr>
                        )) : (
                            <>
                                {orderByIdData && orderByIdData.length > 0 ? (
                                    <tr key={orderByIdData.orderId}>
                                        <td>{orderByIdData[0].orderId}</td>
                                        <td>{orderByIdData.length > 0 ? new Date(orderByIdData[0].date).toLocaleDateString() : 'Invalid Date'}</td>
                                        <td>
                                            {orderByIdData[0].orderItems && orderByIdData[0].orderItems.map((item, i) => (
                                                <span key={i}>{item.plantName}{i !== orderByIdData[0].orderItems.length - 1 ? ', ' : ''}</span>
                                            ))}
                                        </td>
                                        <td>{orderByIdData[0].totalPrice}</td>
                                        <td>{orderByIdData[0].customerId}</td>
                                        <td className={"delete-order-btn"} onClick={() => {
                                            deleteOrder.mutate(orderByIdData.orderId);
                                        }}>Remove</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td colSpan="5">{'Order not found'}</td>
                                    </tr>
                                )}
                            </>
                        )}

                    </tbody>
                </table>
            </div>
        </>
    )
}
export default AdminOrder;