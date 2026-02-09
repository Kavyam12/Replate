import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import "./Login.css"
import {useState} from 'react'; 
// import axios from "axios";
import "./Login.css"

function Registration() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [role, setRole] = useState("");
  const [contactNumber, setContactnumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword){
      alert("Passwords Don't Match");
      return;
    }

    console.log(name, email, password, role, contactNumber);
    navigate("/login");
  }

  return (
    <div className='login-page'>

      <div className="login-box">

        <div className="login-header">
          <header>Registration</header>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>

            <div className="input-field">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text"
                id='name' 
                className='input-name' 
                placeholder='Full Name' 
                autoComplete='off' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id='email'
                className='input-email' 
                placeholder='Email' 
                autoComplete='off'
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>

            <div className="input-field">
              <label htmlFor="password"></label>

              <input 
                type="password" 
                id='password'
                minLength={6}
                className='input-password' 
                placeholder='Password' 
                autoComplete='off' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>

            <div className="input-field">
              <label htmlFor="cnfrmPassword">Confirm Password</label>
              <input 
                type="password" 
                id='cnfrmPassword'
                className='input-cnfrmPassword' 
                placeholder='Confirm Password' 
                autoComplete='off' 
                value={confirmPassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                required />
            </div>

            <div className="input-field">
              <label htmlFor="roles"></label>
              <select 
                id="roles"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >

                <option value="">Select Your Role</option>
                <option value="RESTAURANT">Restaurant</option>
                <option value="NGO">NGO</option>
                <option value="VOLUNTEER">Volunteer</option>


              </select>
            </div>

            <div className="input-field">
              <label htmlFor="contactNumber">Contact Number</label>
              <input 
                type="text"
                id='contactNumber' 
                pattern='[0-9]{10}'
                className='input-number' 
                placeholder='Contact Number (+91)' 
                autoComplete='off' 
                value={contactNumber}
                onChange={(e) => setContactnumber(e.target.value)}
                required />
            </div>

            <div className="submit-btn">
              <button className="btn-submit">
                <span className="text">
                  <span className="text-inside">
                    Register
                  </span>
                </span>
              </button>
            </div>


            <div className="sign-up-link">
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </form>


      </div>
    </div>
  )
}

export default Registration