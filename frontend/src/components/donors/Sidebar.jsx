import React from 'react'
import "./Sidebar.css";
import logo from  "../../assets/images/logo.png"
import { NavLink } from 'react-router-dom';


import {
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  TrendingUp,
  History,
  Settings
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="sidebar">

      <div className="sidebar-logo">
          <img src={logo} alt="Replate Logo" />
          <p>Proud Donor !</p>
      </div>

      <ul className="nav-links">
        <li className="nav-item">
            <NavLink
                to = "/donor"
                end
                className={({isActive}) => isActive ? "active" : ""}
            >
              <LayoutDashboard size = {20}/>
              Dashboard
            </NavLink>
        </li>

        <li className="nav-item">
            <NavLink
                to = "/donor/food-listing"
                className={({isActive}) => isActive ? "active" : ""}
            >
              <UtensilsCrossed size = {20}/>
              List Excess Food
            </NavLink>
        </li>

        <li className="nav-item">
            <NavLink
                to = "/donor/orders"
                className={({isActive}) => isActive ? "active" : ""}
            >
              <ShoppingBag size = {20}/>
              Orders
            </NavLink>
        </li>

        <li className="nav-item">
            <NavLink
                to = "/donor/sales"
                className={({isActive}) => isActive ? "active" : ""}
            >
              <TrendingUp size = {20}/>
              Sales
            </NavLink>
        </li>

        {/* <li className="nav-item">
            <NavLink
                to = "/donor/orderHistory"
                className={({isActive}) => isActive ? "active" : ""}
            >
              <History size = {20}/>
              Order History
            </NavLink>
        </li> */}

        <li className="nav-item">
            <NavLink
                to = "/donor/me"
                className={({isActive}) => isActive ? "active" : ""}
            >
              <Settings size = {20}/>
              Settings
            </NavLink>
        </li>

        
      </ul>


    </div>
  )
}

export default Sidebar