import "../css-files/AdminCustomer.css"
import {useQuery} from "react-query";
import axios from "axios";

function AdminCustomer() {
    const {data} = useQuery({
        queryKey: "GETDATA",
        queryFn() {
            return axios.get("http://localhost:8080/customer/get-all-data")
        }
    })

    return (
        <>
            <div className={"header-adCustomer"}>
                <div className={"right-section-adCustomer"}>
                    <img className={"logo-adCustomer"} src={"src/assets/logo2.png"}/>
                </div>
                <div className={"left-section-adCustomer"}>
                    <p className={"customer-btn-adCustomer"}>Customers</p>
                    <p className={"product-btn-adCustomer"}>Products</p>
                    <p className={"order-btn-adCustomer"}>Orders</p>
                    <button className={"logout-btn-adCustomer"}>Log out</button>
                </div>
            </div>

            <div className={"centre-adCustomer"}>
                <p className={"page-heading-adCustomer"}>Customer Details</p>
                <table className={"table-adCustomer"}>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Full name</td>
                            <td>Address</td>
                            <td>Mobile number</td>
                            <td>Email address</td>
                            <td>Password</td>
                        </tr>
                    </thead>

                    <tbody>
                    {data?.data?.map((customer) => (
                        <tr key = {customer.id}>
                            <td>{customer.customerId}</td>
                            <td>{customer.fullName}</td>
                            <td>{customer.address}</td>
                            <td>{customer.mobileNo}</td>
                            <td>{customer.email}</td>
                            <td>{customer.password}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default AdminCustomer;