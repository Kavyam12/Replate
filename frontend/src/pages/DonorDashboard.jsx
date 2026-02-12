// import React, {useEffect, useState} from 'react'
// import {
//   Box,
//   ShoppingCart,
//   DollarSign,
//   Clock,
//   AwardIcon
// } from 'lucide-react';
// import './DonorDashboard.css';

// import springconfig from '../api/api.js';

// const IconMap = {
//   Box,
//   ShoppingCart,
//   DollarSign,
//   Clock
// };

// function DonorDashboard() {

//   const [statCards, setStatCards] = useState([]);
//   const [recentFood, setRecentFood] = useState([]);

//   useEffect(() => {
//   fetchDashboardSummary();
//   fetchRecentFoodListings();
// }, []);

//   const fetchDashboardSummary = async () => {
//     try {
//       const resp = await springconfig.get("/donor/kpi");
//       setStatCards(resp.data);
//       console.log(resp.data);
//     } catch (error) {
//       console.error("Failed to fetch data from the server", error);
//     }
//   };

//   const fetchRecentFoodListings = async () =>{
//     try {
//       const res = await springconfig.get("/donor/recentListings");
//       console.log(res.data);
//     } catch (error) {
//       console.error("Failed to fetch details from server", error);
//     }
    
//   }
//   return (
//     <div className="dashboard-container">

//       <div className="dashboard-header">
//         <h1>Overview</h1>
//         <p>Monitor your food listings and orders at a glance</p>
//       </div>

//       <div className="stats-grid">
//           {statCards.map(card => {
//             const Icon = IconMap[card.icon];
//             return (
//               <div key = {card.id} className="card stat-card">
//                 <div
//                   className='stat-icon'
//                   style={{ backgroundColor: card.color, color: card.textColor}}
//                 >
//                   {Icon && <Icon size = {24} />}
//                 </div>
//               <div>
//                 <div className='stat-value'>{card.value}</div>
//                 <div className="stat-label">{card.title}</div>
//               </div>
//               </div>
//             )
//           })}

//       </div>

//       <div className="section-title">Recently Listed Foods</div>

//       <div className="food-list-section">
//         <table className="food-table">
//           <thead>
//             <tr>
//               <th>Food Item</th>
//               <th>Quantity</th>
//               <th>Price</th>
//               <th>Pickup Deadline</th>
//               <th>Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {recentFood.map (food => (
//               <tr key={food.id}>

//                 <td>
//                   <div className="food-image">
//                     <img src={food.image} alt={food.name} />
//                     <span>{food.name}</span>
//                   </div>
//                 </td>

//                 <td>
//                   {food.quantity}
//                 </td>

//                 <td>
//                   {food.price}
//                 </td>

//                 <td>
//                   {food.deadline}
//                 </td>

//                 <td>
//                   <span className={`status-badge ${food.status.toLowerCase()}`}>
//                     {food.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default DonorDashboard

import React, { useState, useEffect } from 'react';
import {
  Box,
  ShoppingCart,
  DollarSign,
  Clock
} from 'lucide-react';
import './DonorDashboard.css';
import api from '../api/api';

const IconMap = {
  Box,
  ShoppingCart,
  DollarSign,
  Clock
};

function DonorDashboard() {

  const [statCards, setStatCards] = useState([
    { id: 1, title: 'Food Listed Today', value: '0', icon: 'Box', className: 'food-listed' },
    { id: 2, title: 'Orders Completed', value: '0', icon: 'ShoppingCart', className: 'orders-completed' },
    { id: 3, title: 'Revenue Generated', value: '₹0', icon: 'DollarSign', className: 'revenue' },
    { id: 4, title: 'Pending Pickups', value: '0', icon: 'Clock', className: 'pending' },
  ]);
  const [recentFood, setRecentFood] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const kpiResponse = await api.get('/donor/kpi');
        const kpiData = kpiResponse.data;

        setStatCards([
          { id: 1, title: 'Food Listed Today', value: kpiData.foodListedToday, icon: 'Box', className: 'food-listed' },
          { id: 2, title: 'Orders Completed', value: kpiData.ordersCompleted, icon: 'ShoppingCart', className: 'orders-completed' },
          { id: 3, title: 'Revenue Generated', value: `₹${kpiData.revenueGenerated}`, icon: 'DollarSign', className: 'revenue' },
          { id: 4, title: 'Pending Pickups', value: kpiData.pendingPickups, icon: 'Clock', className: 'pending' },
        ]);

        const listingsResponse = await api.get('/donor/recentListings');
        setRecentFood(listingsResponse.data);
        console.log(kpiData);
        console.log(listingsResponse.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

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
            <div key={card.id} className="card stat-card">
              <div className={`stat-icon ${card.className}`}>
                {Icon && <Icon size={24} />}
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
            {recentFood.map((food, index) => (
              <tr key={index}>

                <td>
                  <div className="food-image">
                    <img src={food.imageUrl} alt={food.foodName || 'Food'} />
                    <span>{food.foodName}</span>
                  </div>
                </td>

                <td>
                  {food.quantity}
                </td>

                <td>
                  ₹{food.price}
                </td>

                <td>
                  {new Date(food.deadline).toLocaleString()}
                </td>

                <td>
                  <span className={`status-badge ${food.status ? food.status.toLowerCase() : ''}`}>
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

export default DonorDashboard;