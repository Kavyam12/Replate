import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, LogOut, ChevronDown } from 'lucide-react';
import './Topbar.css';
import springconfig from '../../api/api';
import { useUser } from '../../Context/UserContext';

const VolunteerTopbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleLogout = async () => {
        try {
            await springconfig.post('/auth/logout');
        } catch (err) {
            console.error('Logout failed', err);
        }
        navigate('/login');
        window.location.reload();
    };

    return (
        <div className="vol-topbar">
            <div className="vol-welcome-text">
                <h3>Welcome Back, Volunteer</h3>
            </div>

            <div className="vol-topbar-actions">
                <button className="vol-icon-btn" title="Notifications">
                    <Bell size={20} />
                </button>

                <div className="vol-user-profile" onClick={() => navigate('/volunteer/me')}>
                    <img
                        src={user?.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=100&h=100&fit=crop'}
                        alt="profile-pic"
                        className="vol-avatar"
                    />
                    <div className="vol-user-info">
                        <span className="vol-user-name">{user?.username || 'Volunteer'}</span>
                        <span className="vol-user-role">{user?.role || 'Volunteer'}</span>
                    </div>
                    <ChevronDown size={20} />
                </div>

                <button className="vol-icon-btn" title="Logout" onClick={handleLogout}>
                    <LogOut size={20} />
                </button>
            </div>
        </div>
    );
};

export default VolunteerTopbar;
