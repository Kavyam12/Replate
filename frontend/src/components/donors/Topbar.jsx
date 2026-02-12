import React from 'react'
import {
    Bell,
    LogOut,
    ChevronDown
} from 'lucide-react';
import {useState} from 'react';
import './Topbar.css';

const Topbar = () => {

    const [user, setUser] = useState({
        username: "Blue Embers",
        role: "Restaurant Owner",
        imageUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop"
    });

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

            <div className="user-profile" >
                <img src={user.imageUrl} alt="profile-pic" className='avatar' />

                <div className="user-info">
                    <span className="user-name">{user.username}</span>
                    <span className="user-role">
                        {user.role}
                    </span>
                </div>
                <ChevronDown size={20} />
            </div>

            <button className="icon-btn" title='Logout'>
                <LogOut size={20} />

            </button>
        </div>
    </div>
  )
}

export default Topbar;