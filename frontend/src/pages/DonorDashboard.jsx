import React, {useState} from 'react'
import {
  Box,
  ShoppingCart,
  DollarSign,
  Clock
} from 'lucide-react';
import './DonorDashboard.css';
import { mockStatCards, mockRecentFood } from '../data/mockdata.js';

const IconMap = {
  Box,
  ShoppingCart,
  DollarSign,
  Clock
};

function DonorDashboard() {

  const [statCards, setStatCards] = useState(mockStatCards);
  const [recentFood, setRecentFood] = useState(mockRecentFood);
  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1>Overview</h1>
        <p>Monitor your food listings and orders at a glance</p>
      </div>

      <div className="stats-grid">
          {statCards.map(card => {
            const Icon = IconMap[card.icon];
            return (
              <div key = {card.id} className="card stat-card">
                <div
                  className='stat-icon'
                  style={{ backgroundColor: card.color, color: card.textColor}}
                >
                  {Icon && <Icon size = {24} />}
                </div>
              <div>
                <div className='stat-value'>{card.value}</div>
                <div className="stat-label">{card.title}</div>
              </div>
              </div>
            )
          })}

      </div>

      <div className="section-title">Recently Listed Foods</div>

      <div className="food-list-section">
        <table className="food-table">
          <thead>
            <tr>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Pickup Deadline</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentFood.map (food => (
              <tr key={food.id}>

                <td>
                  <div className="food-image">
                    <img src={food.image} alt={food.name} />
                    <span>{food.name}</span>
                  </div>
                </td>

                <td>
                  {food.quantity}
                </td>

                <td>
                  {food.price}
                </td>

                <td>
                  {food.deadline}
                </td>

                <td>
                  <span className={`status-badge ${food.status.toLowerCase()}`}>
                    {food.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DonorDashboard