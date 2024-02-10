import "../css-files/Order.css";
import HeaderUser from "./HeaderUser.tsx";
import HeaderUserBeforeLogin from "./HeaderUserBeforeLogin.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import {useEffect, useState} from "react";

function Order() {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem("cartItems"));
        if (storedItems) {
            setCartItems(storedItems);
            updateSubtotal(storedItems);
        }
    }, []);

    useEffect(() => {
        setDeliveryCharge(100);
    }, []);

    const handleIncrement = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].quantity += 1;
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        updateSubtotal(updatedCartItems);
    };

    const handleDecrement = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
            setCartItems(updatedCartItems);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            updateSubtotal(updatedCartItems);
        }
    };

    const handleRemove = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        updateSubtotal(updatedCartItems);
    };

    const updateSubtotal = (updatedCartItems) => {
        const total = updatedCartItems.reduce((acc, order) => acc + (order.price * order.quantity), 0);
        setSubtotal(total);
    };

    return (
        <>
            {localStorage.getItem("loggedInUserId") ? <HeaderUser /> : <HeaderUserBeforeLogin />}

            <div className={"centre-order"}>
                <div className={"order-title-container"}>
                    <p className={"order-title-text"}>Your Cart</p>
                </div>

                {cartItems.length > 0 ? (
                    <div className={"order-list"}>
                        {cartItems.map((item, index) => (
                            <div>
                                <div className={"order-container"} key={index}>
                                    <div className={"order-img-details-container"}>
                                        <img className={"img-order"} src={"/" + item.image}/>

                                        <div className={"order-details"}>
                                            <p className={"name-order"}>{item.name}</p>
                                            <p className={"price-order"}>Rs. {item.price}</p>

                                            <div className={"order-number-container"}>
                                                <FontAwesomeIcon className={"minus-plus-btn-order"} icon={faCircleMinus} onClick={() => handleDecrement(index)} />
                                                <p className={"order-number-pView"}>{item.quantity}</p>
                                                <FontAwesomeIcon className={"minus-plus-btn-order"} icon={faCirclePlus} onClick={() => handleIncrement(index)} />
                                            </div>
                                        </div>
                                    </div>

                                    <p className={"remove-btn-order"} onClick={() => handleRemove(index)}>Remove</p>
                                </div>
                                <hr className={"divider-order"}></hr>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={"empty-order-main-container"}>
                        <div className={"empty-order-container"}>
                            <img className={"order-empty-img"} src={"src/assets/order/order.png"} alt="Empty cart" />
                            <p className={"cart-empty-text"}>Your cart is empty</p>
                        </div>
                        <hr className={"divider-order"}></hr>
                    </div>
                )}

                <div className={"price-checkout-container"}>
                    <div className={"price-container-order"}>
                        <p className={"subtotal-delivery-text"}>Subtotal: Rs. {subtotal}</p>
                        <p className={"subtotal-delivery-text"}>Delivery charge: Rs. {deliveryCharge}</p>
                        <p className={"total-price-text"}>Total: Rs. {subtotal + deliveryCharge}</p>
                    </div>

                    <button className={"checkout-btn"}>Checkout</button>
                </div>
            </div>
        </>
    );
}

export default Order;
