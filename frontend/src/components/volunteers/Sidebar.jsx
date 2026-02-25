import React from 'react';
import './Sidebar.css';
import logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User } from 'lucide-react';

const VolunteerSidebar = () => {
    return (
        <div className="vol-sidebar">
            <div className="vol-sidebar-logo">
                <img src={logo} alt="Replate Logo" />
                <p>Volunteer</p>
            </div>

            <ul className="vol-nav-links">
                <li className="vol-nav-item">
                    <NavLink
                        to="/volunteer"
                        end
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        <LayoutDashboard size={20} />
                        Dashboard
                    </NavLink>
                </li>

                <li className="vol-nav-item">
                    <NavLink
                        to="/volunteer/me"
                        className={({ isActive }) => isActive ? 'active' : ''}
                    >
                        <User size={20} />
                        Profile
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default VolunteerSidebar;
