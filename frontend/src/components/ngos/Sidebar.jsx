import React from 'react'
import "./Sidebar.css";
import logo from "../../assets/images/logo.png"
import { NavLink } from 'react-router-dom';


import {
    LayoutDashboard,
    History,
    User,
    ShoppingCart
} from "lucide-react";

const Sidebar = () => {
    return (
        <div className="sidebar">

            <div className="sidebar-logo">
                <img src={logo} alt="Replate Logo" />
                <p>NGO Partner</p>
            </div>

            <ul className="nav-links">
                <li className="nav-item">
                    <NavLink
                        to="/ngo"
                        end
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/ngo/me"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        <User size={20} />
                        Profile
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/ngo/history"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        <History size={20} />
                        Order History
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink
                        to="/ngo/cart"
                        className={({ isActive }) => isActive ? "active" : ""}
                    >
                        <ShoppingCart size={20} />
                        Cart
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar
