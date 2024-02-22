import "../css-files/AdminCustomer.css"
import {useQuery} from "react-query";
import axios from "axios";
import HeaderAdmin from "./HeaderAdmin.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {useEffect, useState} from "react";

interface DataRecord {
    totalRecords: number;
}

function AdminCustomer() {
    const [customerId, setCustomerId] = useState("");
    const [customerRecords, setCustomerRecords] = useState<DataRecord | null>(null);

    const {data: allCustomerData} = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/customer/get-all-data",{
                headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
            })
        }
    })

    const { data: customerByIdData } = useQuery(
        ["GETDATA", customerId],
        async () => {
            if (customerId.trim() !== "") {
                const response = await axios.get(
                    `http://localhost:8080/customer/get-by-id/${customerId}`, {
                        headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
                    }
                );
                return response.data;
            }
            return null;
        },
        {
            enabled: customerId.trim() !== "",
        }
    );

    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customerResponse = await axios.get('http://localhost:8080/customer/customer-record', {
                    headers:{"Authorization":"Bearer " + localStorage.getItem("adminToken")}
                });
                setCustomerRecords(customerResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <HeaderAdmin/>

            <div className={"centre-adCustomer"}>
                <p className={"page-heading-adCustomer"}>Customer Details</p>

                <div className={"admin-customer-record-container"}>
                    <FontAwesomeIcon className={"customer-record-icon"} icon={faUser}/>
                    <div className={"admin-customer-records"}>
                        <p className={"customer-registered-text"}>Customers registered</p>
                        <h1 className={"customer-number-data"} id="admin-dashboard-data">{customerRecords?.totalRecords}</h1>
                    </div>
                </div>

                <div className={"search-container-adCustomer"}>
                    <input className={"search-bar-adCustomer"}
                           placeholder={"Enter customer id"}
                           value={customerId}
                           onChange={handleInputChange}/>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={"search-btn-adCustomer"}/>
                </div>

                <table className={"table-adCustomer"}>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Full name</td>
                            <td>Address</td>
                            <td>Mobile number</td>
                            <td>Email address</td>
                        </tr>
                    </thead>

                    <tbody>
                    {customerId.trim() === "" ?
                        allCustomerData?.data?.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.customerId}</td>
                                <td>{customer.fullName}</td>
                                <td>{customer.address}</td>
                                <td>{customer.mobileNo}</td>
                                <td>{customer.email}</td>
                            </tr>
                        )) : (
                            customerByIdData ? (
                                <tr key={customerByIdData.id}>
                                    <td>{customerByIdData.customerId}</td>
                                    <td>{customerByIdData.fullName}</td>
                                    <td>{customerByIdData.address}</td>
                                    <td>{customerByIdData.mobileNo}</td>
                                    <td>{customerByIdData.email}</td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="6">Customer not found</td>
                                </tr>
                            )
                        )}
                    </tbody>

                </table>
            </div>
        </>
    )
}
export default AdminCustomer;