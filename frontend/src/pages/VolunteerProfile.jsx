import React, { useState, useEffect } from 'react';
import { Camera, Save, X, Edit2, ShieldCheck, Calendar, User, MapPin, Phone } from 'lucide-react';
import './VolunteerProfile.css';
import api from '../api/api';
import springconfig from '../api/api';

const DEFAULT_FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop";

const VolunteerProfile = () => {

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);

    const [profileData, setProfileData] = useState({
        name: '',
        phone: '',
        address: '',
        bio: '',
        createdAt: '',
        verificationStatus: '',
        imageUrl: ''
    });

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        bio: '',
    });

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        setLoading(true);
        try {
            const res = await springconfig.get("/volunteer/me");
            const data = res.data;

            const mappedProfile = {
                name: data.fullName,
                phone: data.phoneNumber,
                address: data.volunteerAddress,
                bio: data.volunteerDescription,
                createdAt: data.createdAt,
                verificationStatus: data.verificationStatus,
                imageUrl: data.imageUrl
            };

            setProfileData(mappedProfile);

            setFormData({
                name: mappedProfile.name || '',
                phone: mappedProfile.phone || '',
                address: mappedProfile.address || '',
                bio: mappedProfile.bio || '',
            });

        } catch (error) {
            console.error('Error fetching volunteer profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
    try {
        if (!formData.address.trim()) {
            alert("Address required");
            return;
        }

        const data = new FormData();

        data.append("volunteerAddress", formData.address);
        data.append("volunteerDescription", formData.bio);

        if (selectedFile) {
            data.append("image", selectedFile);
        }

        await springconfig.put("/volunteer/update", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        fetchProfileData();
        setIsEditing(false);

    } catch (error) {
        console.error(error.response?.data || error);
    }
};

    const handleCancel = () => {
        setFormData({
            name: profileData.name || '',
            phone: profileData.phone || '',
            address: profileData.address || '',
            bio: profileData.bio || '',
        });
        setIsEditing(false);
    };

    if (loading) return <div className="vol-loading">Loading Profile...</div>;

    return (
        <div className="vol-profile-wrapper">

            <div className="vol-profile-banner">
                <div className="vol-banner-overlay" />
            </div>

            <div className="vol-profile-content">

                <div className="vol-profile-sidebar">
                    <div className="vol-profile-image-wrap">
                        <img
                            src={profileData.imageUrl || DEFAULT_FALLBACK_IMAGE}
                            alt="Profile"
                            className="vol-profile-img"
                        />
                        <button className="vol-change-photo-btn">
                            <Camera size={18} />
                        </button>
                    </div>

                    <div className="vol-profile-identity">
                        <h2>{profileData.name || 'Volunteer'}</h2>
                        <span className={`vol-badge ${profileData.verificationStatus ? profileData.verificationStatus.toLowerCase() : 'pending'}`}>
                            <ShieldCheck size={14} />
                            {profileData.verificationStatus || 'Pending Verification'}
                        </span>
                    </div>

                    <div className="vol-profile-meta">

                        <div className="vol-meta-row">
                            <Phone size={16} />
                            <div>
                                <label>Phone</label>
                                <p>{profileData.phone || '—'}</p>
                            </div>
                        </div>

                        <div className="vol-meta-row">
                            <MapPin size={16} />
                            <div>
                                <label>Address</label>
                                <p>{profileData.address || '—'}</p>
                            </div>
                        </div>

                        <div className="vol-meta-row">
                            <Calendar size={16} />
                            <div>
                                <label>Joined</label>
                                <p>{profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : '—'}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="vol-profile-details">

                    <div className="vol-card-header">
                        <h3>Personal Details</h3>

                        {!isEditing ? (
                            <button className="vol-action-btn edit" onClick={() => setIsEditing(true)}>
                                <Edit2 size={16} /> Edit Profile
                            </button>
                        ) : (
                            <button className="vol-action-btn cancel" onClick={handleCancel}>
                                <X size={16} /> Cancel
                            </button>
                        )}
                    </div>

                    <div className="vol-form-grid">

                        <div className="vol-form-group">
                            <label>Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="vol-form-input"
                                />
                            ) : (
                                <p className="vol-static-field">{profileData.name || '—'}</p>
                            )}
                        </div>

                        <div className="vol-form-group">
                            <label>Phone Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="vol-form-input"
                                />
                            ) : (
                                <p className="vol-static-field">{profileData.phone || '—'}</p>
                            )}
                        </div>

                        <div className="vol-form-group vol-full-width">
                            <label>Address</label>
                            {isEditing ? (
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="vol-form-input"
                                    rows="2"
                                />
                            ) : (
                                <p className="vol-static-field">{profileData.address || '—'}</p>
                            )}
                        </div>

                        <div className="vol-form-group vol-full-width">
                            <label>About Me</label>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    className="vol-form-input"
                                    rows="4"
                                />
                            ) : (
                                <p className="vol-static-field">{profileData.bio || '—'}</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="vol-save-container">
                    <button className="vol-save-btn" onClick={handleSave}>
                        <Save size={20} />
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default VolunteerProfile;