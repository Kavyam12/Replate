import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import {
    Bell,
    LogOut,
    ChevronDown
} from 'lucide-react';
import {useState} from 'react';
import './Topbar.css';
import springconfig from '../../api/api';
import {useUser} from '../../Context/UserContext';

const Topbar = () => {

    // const [user, setUser] = useState({
    //     username: "Blue Embers",
    //     role: "Restaurant Owner",
    //     imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop"
    // });

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const navigate = useNavigate();
   const { user } = useUser();

   const handleLogout = async () => {
    try {
        
        await springconfig.post("/auth/logout");
    } catch (err) {
        console.error("Logout failed", err);
    }

    setShowLogoutConfirm(false);
    navigate("/login");
    window.location.reload();
};

  return (
    <div className="topbar">

        <div className="welcome-text">
            <h3>Welcome Back, Donor</h3>
        </div>

        <div className="topbar-actions">
            <button className="icon-btn">
                <Bell size={20} />
                <span className="notification-badge"></span>
            </button>

            <div className="user-profile"  onClick={() => navigate('/donor/me')}>
                <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop" alt="profile-pic" className='avatar' />

                <div className="user-info">
                    <span className="user-name">{user?.username}</span>
                    <span className="user-role">
                        {user?.role}
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