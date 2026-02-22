// import React, { useState, useEffect } from 'react';
// import { Trash2, ShoppingBag, ArrowLeft, CarTaxiFront } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import './NgoCart.css';
// import springconfig from '../api/api';

// // const API_BASE_URL = "http://localhost:8080";

// const NgoCart = () => {
//     const navigate = useNavigate();
//     const [cartItems, setCartItems] = useState([]);
//     const [total, setTotal] = useState(0);

//     useEffect(() => {
//         fetchCart();
//     }, []);

//     const fetchCart = async () => {
//         try {
//             const resp = await springconfig("/cart");
//             const data = await resp.JSON();

//             setCartItems(data);
//             calculateTotal(data);
//         } catch (error) {
//             console.error("Cart Fetch Failed", error);
//         }
//     }

//     const getImageUrl = (imagePath) => {
//         if (!imagePath) return "https://via.placeholder.com/300x200?text=No+Image";
//         if (imagePath.startsWith("http")) return imagePath;
//         return `${API_BASE_URL}${imagePath}`;
//     };

//     const calculateTotal = (items) => {
//         const sum = items.reduce((acc, item) => acc + (item.price * item.selectedQuantity), 0);
//         setTotal(sum);
//     };

//     const updateQuantity = (id, newQuantity) => {
//         if (newQuantity < 1) return;

//         const updatedItems = cartItems.map(item => {
//             // Use foodName fallback if ID is missing (aligns with NgoDashboard logic)
//             const itemId = item.id || item.foodName;
//             if (itemId === id) {
//                 // Check if requested quantity exceeds available quantity
//                 const limit = item.quantity; // Available stock
//                 return { ...item, selectedQuantity: Math.min(newQuantity, limit) };
//             }
//             return item;
//         });

//         setCartItems(updatedItems);
//         localStorage.setItem('ngoCart', JSON.stringify(updatedItems));
//         calculateTotal(updatedItems);
//     };

//     const removeItem = (id) => {
//         const updatedItems = cartItems.filter(item => {
//             const itemId = item.id || item.foodName;
//             return itemId !== id;
//         });
//         setCartItems(updatedItems);
//         localStorage.setItem('ngoCart', JSON.stringify(updatedItems));
//         calculateTotal(updatedItems);
//     };

//     const handleCheckout = () => {
//         // Just navigation for now, backend integration comes later as per user request
//         navigate('/ngo/checkout');
//     };

//     if (cartItems.length === 0) {
//         return (
//             <div className="empty-cart-container">
//                 <ShoppingBag size={64} color="#bdc3c7" />
//                 <h2>Your cart is empty</h2>
//                 <p>Looks like you haven't added any food items yet.</p>
//                 <button className="browse-btn" onClick={() => navigate('/ngo')}>
//                     Browse Food Listings
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="cart-container">
//             <div className="cart-header">
//                 <button className="back-btn" onClick={() => navigate('/ngo')}>
//                     <ArrowLeft size={20} />
//                 </button>
//                 <h1>Your Cart</h1>
//             </div>

//             <div className="cart-content">
//                 <div className="cart-items-list">
//                     {cartItems.map((item, index) => {
//                         const itemId = item.id || item.foodName || `cart-item-${index}`;
//                         return (
//                             <div key={itemId} className="cart-item">
//                                 <div className="item-image">
//                                     <img src={getImageUrl(item.image)} alt={item.foodName} />
//                                 </div>

//                                 <div className="item-details">
//                                     <h3>{item.foodName}</h3>
//                                     <p className="restaurant-name">From: {item.restaurantName || "Partner Restaurant"}</p>
//                                     <p className="item-price">₹{item.price}</p>
//                                 </div>

//                                 <div className="item-actions">
//                                     <div className="quantity-control">
//                                         <button onClick={() => updateQuantity(itemId, item.selectedQuantity - 1)}>-</button>
//                                         <span>{item.selectedQuantity}</span>
//                                         <button onClick={() => updateQuantity(itemId, item.selectedQuantity + 1)}>+</button>
//                                     </div>

//                                     <div className="item-subtotal">
//                                         ₹{item.price * item.selectedQuantity}
//                                     </div>

//                                     <button className="remove-btn" onClick={() => removeItem(itemId)}>
//                                         <Trash2 size={20} />
//                                     </button>
//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>

//                 <div className="cart-summary">
//                     <h2>Order Summary</h2>
//                     <div className="summary-row">
//                         <span>Subtotal</span>
//                         <span>₹{total}</span>
//                     </div>
//                     <div className="summary-row">
//                         <span>Platform Fee</span>
//                         <span>₹0</span>
//                     </div>
//                     <div className="divider"></div>
//                     <div className="summary-row total">
//                         <span>Total</span>
//                         <span>₹{total}</span>
//                     </div>

//                     <button className="checkout-btn" onClick={handleCheckout}>
//                         Proceed to Checkout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NgoCart;


import React, { useState, useEffect } from "react";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NgoCart.css";
import springconfig from "../api/api";

const NgoCart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const resp = await springconfig.get("/cart/cart-items");
            const data = resp.data;

            setCartItems(data);
            calculateTotal(data);
        } catch (error) {
            console.error("Cart Fetch Failed", error);
        }
    };

    const calculateTotal = (items) => {
        const sum = items.reduce(
            (acc, item) => acc + item.foodListing.price * item.quantity,
            0
        );
        setTotal(sum);
    };

    // const updateQuantity = async (listingId, newQty) => {
    //     if (newQty < 1) return;

    //     try {
    //         await springconfig.post(
    //             `/cart/add?listingId=${listingId}&qty=${newQty}`
    //         );

    //         fetchCart(); // refresh authoritative state
    //     } catch (error) {
    //         console.error("Quantity Update Failed", error);
    //     }
    // };

    const updateQuantity = async (listingId, delta) => {
    try {
        await springconfig.post(
            `/cart/add?listingId=${listingId}&qty=${delta}`
        );

        fetchCart();

    } catch (error) {
        console.error("Quantity Update Failed", error);
    }
};

    const removeItem = async (listingId) => {
        try {
            await springconfig.delete(
                `/cart/remove?listingId=${listingId}`
            );

            fetchCart();
        } catch (error) {
            console.error("Remove Failed", error);
        }
    };

    const getImageUrl = (imagePath) => {
        if (!imagePath)
            return "https://via.placeholder.com/300x200?text=No+Image";

        if (imagePath.startsWith("http")) return imagePath;

        return `http://localhost:8080${imagePath}`;
    };

    const handleCheckout = () => {
        navigate("/ngo/checkout");
    };

    if (cartItems.length === 0) {
        return (
            <div className="empty-cart-container">
                <ShoppingBag size={64} color="#bdc3c7" />
                <h2>Your cart is empty</h2>
                <button
                    className="browse-btn"
                    onClick={() => navigate("/ngo")}
                >
                    Browse Food Listings
                </button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <div className="cart-header">
                <button
                    className="back-btn"
                    onClick={() => navigate("/ngo")}
                >
                    <ArrowLeft size={20} />
                </button>
                <h1>Your Cart</h1>
            </div>

            <div className="cart-content">
                <div className="cart-items-list">
                    {cartItems.map((item) => {
                        const listing = item.foodListing;
                        const listingId = listing.id;

                        return (
                            <div key={item.id} className="cart-item">
                                <div className="item-image">
                                    <img
                                        src={getImageUrl(listing.imageUrl)}
                                        alt={listing.foodName}
                                    />
                                </div>

                                <div className="item-details">
                                    <h3>{listing.foodName}</h3>
                                    <p>₹{listing.price}</p>
                                </div>

                                <div className="item-actions">
                                    <div className="quantity-control">
                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    listingId,
                                                    -1
                                                )
                                            }
                                        >
                                            -
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    listingId,
                                                    +1
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div className="item-subtotal">
                                        ₹{listing.price * item.quantity}
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() =>
                                            removeItem(listingId)
                                        }
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="cart-summary">
                    <h2>Order Summary</h2>

                    <div className="summary-row">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                    <button
                        className="checkout-btn"
                        onClick={handleCheckout}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NgoCart;