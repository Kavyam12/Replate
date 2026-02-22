// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ArrowLeft, CheckCircle, CreditCard, ShoppingBag } from 'lucide-react';
// import './NgoCheckout.css';
// import springconfig from '../api/api';

// const NgoCheckout = () => {
//     const navigate = useNavigate();
//     const [cartItems, setCartItems] = useState([]);
//     const [total, setTotal] = useState(0);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [orderPlaced, setOrderPlaced] = useState(false);

//     useEffect(() => {
//         fetchCart();
//     }, [navigate]);

//     const fetchCart = async () => {
//     try {
//         const resp = await springconfig.get("/cart/cart-items");
//         const data = resp.data;

//         if (!data.length) {
//             navigate("/ngo");
//             return;
//         }

//         setCartItems(data);

//         const sum = data.reduce(
//             (acc, item) => acc + item.foodListing.price * item.quantity,
//             0
//         );

//         setTotal(sum);

//         } catch (error) {
//             console.error("Checkout cart fetch failed", error);
//         }
//     };

//     const handlePlaceOrder = async () => {
//         setIsProcessing(true);

//         try {
          
//             const resp = await springconfig.post("/checkout/place-order");

//             if (resp.status === 200){
//                 setOrderPlaced(true);
//             } else {
//                 alert("Checkout failed !! ");
//             }

//         } catch (error) {
//             console.error("Order failed:", error);
//             alert("Failed to place order. Please try again.");
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     if (orderPlaced) {
//         return (
//             <div className="checkout-container">
//                 <div className="checkout-content">
//                     <div className="success-message">
//                         <div className="success-icon">
//                             <CheckCircle size={32} />
//                         </div>
//                         <h2>Order Placed Successfully!</h2>
//                         <p>Thank you for your order. The restaurant has been notified.</p>
//                         <button className="return-home-btn" onClick={() => navigate('/ngo')}>
//                             Back to Dashboard
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="checkout-container">
//             <div className="checkout-header">
//                 <button className="back-btn" onClick={() => navigate('/ngo/cart')}>
//                     <ArrowLeft size={20} />
//                 </button>
//                 <h1>Checkout</h1>
//             </div>

//             <div className="checkout-content">
//                 <div className="checkout-section">
//                     <h2><ShoppingBag size={20} /> Order Summary</h2>
//                     <div className="order-items-summary">
//                         {cartItems.map((item, index) => (
//                             <div key={index} className="summary-item">
//                                 <div>
//                                     <span className="summary-item-name">{item.foodName}</span>
//                                     <span className="summary-item-qty">x{item.selectedQuantity}</span>
//                                 </div>
//                                 <span className="summary-item-price">₹{item.price * item.selectedQuantity}</span>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className="checkout-section">
//                     <h2><CreditCard size={20} /> Payment Details</h2>
//                     <p style={{ color: '#7f8c8d', fontSize: '14px' }}>
//                         Payment will be processed upon delivery/pickup as per agreement.
//                     </p>
//                 </div>

//                 <div className="price-breakdown">
//                     <div className="breakdown-row">
//                         <span>Subtotal</span>
//                         <span>₹{total}</span>
//                     </div>
//                     <div className="breakdown-row">
//                         <span>Platform Fee</span>
//                         <span>₹0</span>
//                     </div>
//                     <div className="breakdown-row total">
//                         <span>Total to Pay</span>
//                         <span>₹{total}</span>
//                     </div>
//                 </div>

//                 <button
//                     className="place-order-btn"
//                     onClick={handlePlaceOrder}
//                     disabled={isProcessing}
//                 >
//                     {isProcessing ? 'Processing...' : 'Place Order'}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default NgoCheckout;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, CreditCard, ShoppingBag } from "lucide-react";
import "./NgoCheckout.css";
import springconfig from "../api/api";

const NgoCheckout = () => {
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const resp = await springconfig.get("/cart/cart-items");
            const data = resp.data;

            if (!data.length) {
                navigate("/ngo");
                return;
            }

            setCartItems(data);

            const sum = data.reduce(
                (acc, item) => acc + item.foodListing.price * item.quantity,
                0
            );

            setTotal(sum);

        } catch (error) {
            console.error("Checkout cart fetch failed", error);
        }
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);

        try {
            const resp = await springconfig.post("/checkout/place-order");

            if (resp.status === 200) {
                setOrderPlaced(true);
            } else {
                alert("Checkout failed");
            }

        } catch (error) {
            console.error("Order failed:", error);
            alert("Failed to place order");
        } finally {
            setIsProcessing(false);
        }
    };

    if (orderPlaced) {
        return (
            <div className="checkout-container">
                <div className="checkout-content">
                    <div className="success-message">
                        <div className="success-icon">
                            <CheckCircle size={32} />
                        </div>

                        <h2>Order Placed Successfully</h2>
                        <p>The restaurant has been notified.</p>

                        <button
                            className="return-home-btn"
                            onClick={() => navigate("/ngo")}
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <button
                    className="back-btn"
                    onClick={() => navigate("/ngo/cart")}
                >
                    <ArrowLeft size={20} />
                </button>

                <h1>Checkout</h1>
            </div>

            <div className="checkout-content">
                <div className="checkout-section">
                    <h2>
                        <ShoppingBag size={20} /> Order Summary
                    </h2>

                    <div className="order-items-summary">
                        {cartItems.map((item) => {
                            const listing = item.foodListing;

                            return (
                                <div key={item.id} className="summary-item">
                                    <div>
                                        <span className="summary-item-name">
                                            {listing.foodName}
                                        </span>

                                        <span className="summary-item-qty">
                                            x{item.quantity}
                                        </span>
                                    </div>

                                    <span className="summary-item-price">
                                        ₹{listing.price * item.quantity}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="checkout-section">
                    <h2>
                        <CreditCard size={20} /> Payment Details
                    </h2>

                    <p style={{ color: "#7f8c8d", fontSize: "14px" }}>
                        Payment handled at pickup/delivery.
                    </p>
                </div>

                <div className="price-breakdown">
                    <div className="breakdown-row">
                        <span>Subtotal</span>
                        <span>₹{total}</span>
                    </div>

                    <div className="breakdown-row">
                        <span>Platform Fee</span>
                        <span>₹0</span>
                    </div>

                    <div className="breakdown-row total">
                        <span>Total to Pay</span>
                        <span>₹{total}</span>
                    </div>
                </div>

                <button
                    className="place-order-btn"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                >
                    {isProcessing ? "Processing..." : "Place Order"}
                </button>
            </div>
        </div>
    );
};

export default NgoCheckout;