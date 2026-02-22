import React, { useEffect, useState } from "react";
import springconfig from "../api/api"; // your axios instance
import "./NgoHistory.css";

const NgoHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await springconfig.get("/ngo/my-orders");
            setOrders(res.data);
        } catch (err) {
            console.error("Failed to load orders", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading orders...</div>;

    if (!orders.length) return <div>No orders found.</div>;

    return (
        <div className="order-history-container">
            <h2>Order History</h2>

            <table className="order-history-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Restaurant</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total</th>
                        <th>Items</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.restaurantName}</td>
                            <td>
                                {new Date(order.createdAt)
                                    .toLocaleString()}
                            </td>
                            <td>{order.orderStatus}</td>
                            <td>₹ {order.totalAmount}</td>

                            <td>
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="item-row">
                                        {item.foodName} × {item.quantity}
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default NgoHistory;