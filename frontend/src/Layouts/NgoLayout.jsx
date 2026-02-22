import React from 'react';
import Sidebar from '../components/ngos/Sidebar';
import TopBar from '../components/ngos/Topbar';
import { Outlet } from 'react-router-dom';
import './Layout.css'; // Reusing the layout CSS as it's generic

const NgoLayout = () => {
    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <TopBar />
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default NgoLayout;
