import React from 'react';
import VolunteerSidebar from '../components/volunteers/Sidebar';
import VolunteerTopbar from '../components/volunteers/Topbar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const VolunteerLayout = () => {
    return (
        <div className="app-container">
            <VolunteerSidebar />
            <div className="main-content">
                <VolunteerTopbar />
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default VolunteerLayout;
