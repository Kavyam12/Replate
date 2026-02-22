import React, { useState, useEffect } from 'react';
import { Camera, Save, X, Edit2, ShieldCheck, Calendar, User } from 'lucide-react';
import './NgoProfile.css';
import springconfig from '../api/api';

const NgoProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initial dummy state - would be replaced by API fetch
    const [profileData, setProfileData] = useState({
        ngoName: '',
        ngoAddress: '',
        ngoDescription: '',
        ownerName: '',
        createdAt: '',
        verificationStatus: '',
        profileImage: ''
    });

    const [formData, setFormData] = useState({
        ngoName: '',
        ngoAddress: '',
        ngoDescription: ''
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        setLoading(true);
        try {
            const res = await springconfig.get("/ngo/me");
            const data = res.data;

            setProfileData({
                ...data,
                ownerName: data.ngoOwner // Map ngoOwner from backend to ownerName in state
            });
            setFormData({
                ngoName: data.ngoName,
                ngoAddress: data.ngoAddress,
                ngoDescription: data.ngoDescription
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await springconfig.put("/ngo/update", formData);

            setProfileData(prev => ({
                ...prev,
                ...formData
            }));

            alert("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    const handleCancel = () => {
        setFormData({
            ngoName: profileData.ngoName,
            ngoAddress: profileData.ngoAddress,
            ngoDescription: profileData.ngoDescription
        });
        setIsEditing(false);
    };

    if (loading) return <div className="loading-container">Loading Profile...</div>;

    return (
        <div className="profile-wrapper">
            <div className="profile-header-banner">
                <div className="banner-overlay"></div>
            </div>

            <div className="profile-content-container">
                {/* Left Column: Identity & Status */}
                <div className="profile-sidebar-card">
                    <div className="profile-image-container">
                        <img
                            src={profileData.profileImage || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="profile-image"
                        />
                        <button className="change-photo-btn" title="Change Photo">
                            <Camera size={18} />
                        </button>
                    </div>

                    <div className="profile-identity">
                        <h2>{profileData.ngoName}</h2>
                        <span className={`status-badge ${profileData.verificationStatus ? profileData.verificationStatus.toLowerCase() : ''}`}>
                            <ShieldCheck size={14} />
                            {profileData.verificationStatus}
                        </span>
                    </div>

                    <div className="profile-meta-info">
                        <div className="meta-item">
                            <User size={16} />
                            <div>
                                <label>Owner</label>
                                <p>{profileData.ownerName}</p>
                            </div>
                        </div>
                        <div className="meta-item">
                            <Calendar size={16} />
                            <div>
                                <label>Joined</label>
                                <p>{profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Editable Details */}
                <div className="profile-details-card">
                    <div className="card-header">
                        <h3>Organization Details</h3>
                        {!isEditing ? (
                            <button className="action-btn edit" onClick={() => setIsEditing(true)}>
                                <Edit2 size={16} /> Edit Profile
                            </button>
                        ) : (
                            <div className="edit-actions">
                                <button className="action-btn cancel" onClick={handleCancel}>
                                    <X size={16} /> Cancel
                                </button>
                                {/* Save button is now floating, removed from here */}
                            </div>
                        )}
                    </div>

                    <div className="form-grid">
                        <div className="form-group full-width">
                            <label>NGO Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="ngoName"
                                    value={formData.ngoName}
                                    onChange={handleInputChange}
                                    className="form-input"
                                />
                            ) : (
                                <p className="static-field">{profileData.ngoName}</p>
                            )}
                        </div>

                        <div className="form-group full-width">
                            <label>Address</label>
                            {isEditing ? (
                                <textarea
                                    name="ngoAddress"
                                    value={formData.ngoAddress}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    rows="3"
                                />
                            ) : (
                                <p className="static-field">{profileData.ngoAddress}</p>
                            )}
                        </div>

                        <div className="form-group full-width">
                            <label>Description & Mission</label>
                            {isEditing ? (
                                <textarea
                                    name="ngoDescription"
                                    value={formData.ngoDescription}
                                    onChange={handleInputChange}
                                    className="form-input"
                                    rows="5"
                                />
                            ) : (
                                <p className="static-field description-text">{profileData.ngoDescription}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Save Button - Only visible when editing */}
            {isEditing && (
                <div className="save-btn-container">
                    <button className="save-btn" onClick={handleSave}>
                        <Save size={20} />
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default NgoProfile;
