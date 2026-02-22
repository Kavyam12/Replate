import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Bell,
    LogOut,
    ChevronDown,
    MapPin,
    ShoppingCart
} from 'lucide-react';
import './Topbar.css';
import springconfig from '../../api/api';
import { useUser } from '../../Context/UserContext';

const Topbar = () => {

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();
    const { user } = useUser();

    const handleLogout = async () => {
        try {
            await springconfig.post("/auth/logout");
        } catch (err) {
            console.error("Logout failed", err);
        }
        navigate("/login");
        window.location.reload();
    };

    return (
        <div className="topbar">

            <div className="welcome-text">
                <h3>Welcome Back, NGO Partner</h3>
            </div>

            <div className="topbar-actions">

                <button className="icon-btn" title="Cart" onClick={() => navigate('/ngo/cart')}>
                    <ShoppingCart size={20} />
                </button>

                <button className="icon-btn" title="Notifications">
                    <Bell size={20} />
                    <span className="notification-badge"></span>
                </button>

                <div className="user-profile" onClick={() => navigate('/ngo/me')}>
                    <img src={user?.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=100&h=100&fit=crop"} alt="profile-pic" className='avatar' />

                    <div className="user-info">
                        <span className="user-name">{user?.username || "NGO User"}</span>
                        <span className="user-role">
                            {user?.role || "Non-Profit Organization"}
                        </span>
                    </div>
                    <ChevronDown size={20} />
                </div>

                <button className="icon-btn" title='Logout' onClick={handleLogout}>
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    )
}

export default Topbar;
