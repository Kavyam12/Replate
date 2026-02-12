import React, {useState, useEffect} from 'react'

import {
  Eye,
  CircleCheckBig
} from 'lucide-react'

import './OrdersList.css'
import springconfig from '../api/api'

const OrdersList = () => {

  const [activeFoods, setActiveFoods] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    fetchCurrentOrders();
    fetchOrderHistory();
  }, [])

  const fetchCurrentOrders = async () => {
    try{
      const resp = await springconfig.get("/donor/orders/current");
      setActiveFoods(resp.data);
      console.log(resp.data);
    } catch (error){
      console.error("Failed to fetch the Current orders", error);
    }
  };
  
  const fetchOrderHistory = async () => {
    try{
      const res = await springconfig.get("/donor/orders/history");
      setOrderHistory(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch the order history", error);
    }
  };

  const formatDateTime = (value) => {
    if (!value) return "-";
    return new Date(value).toLocaleString();
  };

  return (
    <div className="orders-container">

      <div className="orders-header">
        <h1>Orders management</h1>
        <p>Track all the orders right here</p>
      </div>

      <div className="orders-section-header">
        <h3>Current Orders</h3>
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Food Item</th>
            <th>Quantity</th>
            <th>Buyer</th>
            <th>Status</th>
            <th>Date and Time</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {activeFoods.map(order => (
            <tr key={order.orderId} >
              <td>
                {order.orderId}
              </td>

              <td>
                {order.foodItemName}
              </td>

              <td>
                {order.quantity} {order.quantityUnit}
              </td>

              <td>
                {order.ngoName}
              </td>

              <td>
                <span className={`status-badge ${(order.status || '').toLowerCase()}`}>
                  {order.status}
                </span>
              </td>

              <td>
                {formatDateTime(order.createdAt)}
              </td>

              <td>
                <Eye size={20}/>
                <CircleCheckBig  size={20}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-history-header">
        <h3>Order History</h3>
      </div>
      <table className="order-history-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Date</th>
              {/* <th>Restaurant Name</th> */}
              <th>NGO Name</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Volunteer Name</th>
            </tr>
          </thead>

          <tbody>
            {orderHistory.map (history => (
              <tr key={history.orderId}>

                <td>
                  {history.orderId}
                </td>

                <td>
                  {formatDateTime(history.orderDate)}
                </td>

                {/* <td>
                  {history.restaurantName}
                </td> */}

                <td>
                  {history.ngoName}
                </td>

                <td>
                  
                    {history.itemSummary}
                </td>

                <td>
                  {history.totalAmount}
                </td>

                <td>
                  <span className={`status-badge ${(history.orderStatus || '').toLowerCase()}`}>
                    {history.orderStatus}
                  </span>
                </td>

                <td>
                  {history.paymentStatus}
                </td>

                <td>
                  {history.paymentMethod}
                </td>

                <td>
                  {history.volunteerName}
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default OrdersList