import { useState } from "react";
import "../css-files/demo.css";
import { useQuery } from "react-query";
import axios from "axios";
function DemoAdminCustomer() {
    const [customerId, setCustomerId] = useState("");
    const { data, isLoading, isError } = useQuery(
        ["GETDATA", customerId],
        async () => {
            if (customerId.trim() !== "") {
                const response = await axios.get(
                    `http://localhost:8080/customer/get-by-id/${customerId}`
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
    return <>
        <div className={"centre-adCustomer"}>
            <p className={"page-heading-adCustomer"}>Customer Details</p>
            <input
                type={"text"}
                placeholder={"Enter Customer ID"}
                value={customerId}
                onChange={handleInputChange}
            />
            <button disabled={!customerId.trim()} onClick={() => setCustomerId("")}>
                Clear
            </button>
            <button disabled={!customerId.trim()} onClick={() => setCustomerId("")}>
                Submit
            </button>

            <div>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error fetching data</p>}
                {data && (
                    <div className={"demo-container"}>
                        <p className={"demo-name"}>Full Name: {data.fullName}</p>
                        <p className={"demo-address"}>Address: {data.address}</p>
                        <p className={"demo-number"}>Mobile Number: {data.mobileNo}</p>
                        <p className={"demo-email"}>Email: {data.email}</p>
                        {/* Add other properties as needed */}
                    </div>
                )}
            </div>
        </div>
    </>
}
export default DemoAdminCustomer