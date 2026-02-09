import React, { useEffect } from 'react'
import { useState } from 'react'
import { Save } from 'lucide-react'
import './Settings.css'
import axios from 'axios'
import springconfig from '../api/api'

const Settings = () => {
  const [profile, setProfile] = useState({
    restaurantName: "",
    contactNumber: '',
    address: '',
    imageUrl: ''
  })

  const [owner, setOwner] = useState({
    ownerName: '',
    email: ''
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    autoAccept: false
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await springconfig.get("/donor/me");
        console.log("Get Data:", res.data);
        setProfile({
          restaurantName: res.data.name,
          contactNumber: String(res.data.contactNumber),
          address: res.data.address,
          imageUrl: res.data.imageUrl
        });
        setOwner({
          ownerName: res.data.ownerName,
          email: res.data.ownerEmail
        })
      } catch (error) {
        console.log(error.response);
      }
    }

    fetchProfile();
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile(p => ({
      ...p,
      [name]: value
    }))
  }

  const handleToggle = (name) => {
    setPreferences(p => ({
      ...p,
      [name]: !p[name]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      const payload = {
        name: profile.restaurantName,
        address: profile.address,
        contactNumber: profile.contactNumber
      };

      const resp = await springconfig.put("/donor/me", payload);

      alert("Profile is updated");

    } catch (error) {

      
      if (error.message){
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
        
      } else {
        console.log("Error:", error);
      }
      alert("Failed to update the user's profile");

    }
  }
  return (
    <div className="settings-container">

      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your restaurant profile and preferences</p>
      </div>

      <div className="settings-section">

        <div className="settings-profile-header">

          <div className="settings-profile-avatar">
            <img src={profile.imageUrl} alt="Restaurant profile picture" />

            <div className="settings-camera-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 0 0 1-2 2H3a2 0 0 1-2-2V8a2 0 0 1 2-2h4l2-3h6l2 3h4a2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            </div>
          </div>
          <div className="settings-profile-info">
            <h2>Restaurant Profile</h2>
            <p>Update your restaurant information</p>
          </div>
        </div>


        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="restaurant-name">Restaurant Name</label>
            <input
              type="text"
              id='restaurant-name'
              name='restaurantName'
              value={profile.restaurantName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="owner-name">Owner Name</label>
            <input
              type="text"
              id='owner-name'
              name='ownerName'
              value={owner.ownerName}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="restaurant-email">Email</label>
            <input
              type="email"
              id='restaurant-email'
              name='email'
              value={owner.email}
              onChange={handleChange}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="phnNumber">Phone Number</label>
            <input
              type="tel"
              id='phnNumber'
              name='contactNumber'
              value={profile.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="restaurant-address">Address</label>
            <input
              type="text"
              id='restaurant-address'
              name='address'
              value={profile.address}
              onChange={handleChange}
            />
          </div>

          <div className="save-btn-container">
            <button className="save-btn" >
              <Save size={20} />
              Save Changes
            </button>
          </div>

        </form>
      </div>

      <div className="settings-section">
        <h3 className="preference-title">Preferences</h3>

        <div className="preference-item">
          <div className="pref-text">
            <h4>Email Notifications</h4>
            <p>Receive notifications about new orders</p>
          </div>
          <label htmlFor="toggle-switch-email" className='settings-switch'>
            <input id="toggle-switch-email" type="checkbox" checked={preferences.emailNotifications} onChange={() => handleToggle('emailNotifications')} />
            <span className="settings-slider"></span>
          </label>
        </div>

        <div className="preference-item">
          <div className="pref-text">
            <h4>Auto-Accept Orders</h4>
            <p>Automaticlly accept orders from verified NGOS</p>
          </div>
          <label htmlFor="toggle-switch-auto" className='settings-switch'>
            <input id="toggle-switch-auto" type="checkbox" checked={preferences.autoAccept} onChange={() => handleToggle('autoAccept')} />
            <span className="settings-slider">
            </span>
          </label>
        </div>

        {/* <div className="save-btn-container">
          <button className="save-btn" >
            <Save size={20} />
            Save Changes
          </button>
        </div> */}
      </div>
    </div>
  )
}

export default Settings