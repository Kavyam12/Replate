import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"

function Registration() {

  const navigate = useNavigate();

  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <div className="login-box">

        <div className="login-header">
          <header>Registration</header>
        </div>

        <div className="input-field">
          <input type="text" className='input-field' placeholder='Full Name' autoComplete='off' required />
        </div>

        <div className="input-field">
          <input type="email" className='input-field' placeholder='Email' autoComplete='off' required />
        </div>

        <div className="input-field">
          <input type="password" className='input-field' placeholder='Password' autoComplete='off' required />
        </div>

        <div className="input-field">
          <input type="password" className='input-field' placeholder='Confirm Password' autoComplete='off' required />
        </div>

        <div className="input-field">
          <input type="dropdown" className='roles' placeholder = 'select role' autoComplete='off' required />
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
          <p>Already have an account? <a onClick={redirectToLogin} style={{cursor:'pointer'}}>Login</a></p>
        </div>

      </div>
    </div>
  )
}

export default Registration