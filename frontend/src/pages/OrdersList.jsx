import React, {useState} from 'react'
import { mockOrders, mockOrderHistory } from '../data/mockdata'
import {
  Eye,
  CircleCheckBig
} from 'lucide-react'

import './OrdersList.css'

const OrdersList = () => {

  const [activeFoods, setActiveFoods] = useState(mockOrders);
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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {mockOrders.map(order => (
            <tr key={order.id} >
              <td>
                {order.orderId}
              </td>

              <td>
                {order.foodItem}
              </td>

              <td>
                {order.quantity}
              </td>

              <td>
                {order.buyer}
              </td>

              <td>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
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
              <th>Restaurant Name</th>
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
            {mockOrderHistory.map (history => (
              <tr key={history.id}>

                <td>
                  {history.id}
                </td>

                <td>
                  {history.orderDate}
                </td>

                <td>
                  {history.restaurantName}
                </td>

                <td>
                  {history.ngoName}
                </td>

                <td>
                  <ul className="items-list">
                    {history.items.map((item, index) => (
                      <li key={index}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>

                <td>
                  {history.totalAmount}
                </td>

                <td>
                  <span className={`status-badge ${history.status.toLowerCase()}`}>
                    {history.status}
                  </span>
                </td>

                <td>
                  {history.paymentStatus}
                </td>

                <td>
                  {history.paymentMethod}
                </td>

                <td>
                  {history.volunteer}
                </td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default OrdersList