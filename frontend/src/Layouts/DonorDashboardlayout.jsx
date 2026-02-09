import React from 'react';
import Sidebar from '../components/donors/Sidebar';
import TopBar from '../components/donors/Topbar';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
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

export default Layout;
