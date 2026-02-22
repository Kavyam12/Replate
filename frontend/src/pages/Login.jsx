import React, { useState } from 'react'
import "./Login.css"
import { useNavigate, Link } from 'react-router-dom'
import springconfig from '../api/api';



function Login() {

  const navigate =  useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const resp = await springconfig.post("/auth/login", {
          email: email,
          password: password
        });

        const role = resp.data.role;

        if (role === "RESTAURANT"){
          navigate("/donor");
        } else if (role === "NGO"){
          navigate("/ngo");
        } else if (role === "VOLUNTEER"){
          navigate("/volunteer");
        } else {
          console.error("Unknown role of the user", role);
        }
        
      } catch (error) {
        console.error("Unable to Login User");
        alert("Email ID or Password is Invalid !!");
      }
      
      
  }
  return (
    <div>

      <div className="login-page">

      

          <div className="login-box">

            <div className="login-header">
              <header>Login</header> 
            </div>

            <form className='login-form' onSubmit={handleSubmit}>


                  <div className="input-field">
                    <label htmlFor="email">Email</label>
                    <input 
                        id='email'
                        type="email" 
                        className='input-email' 
                        placeholder='Email' 
                        value = {email} 
                        autoComplete='off' 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                  </div>


                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id='password'
                        className='input-password' 
                        placeholder='Password' 
                        value={password}
                        autoComplete='off' 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                  </div>

                  <div className="remember-me">
                    <section>
                      <input type="checkbox" id='check' />
                      <label htmlFor="check">Remember me</label>
                    </section>
                  </div>

                  <div className="reg-page">
                    <p>Don't have an account ? <Link to="/registration"> Register Now !</Link></p>
                  </div>

                  <div className="submit-btn">
                    <button 
                        className="btn-submit"
                        type='submit'>
                      <span className="text">
                        <span className="text-inside">
                          Submit
                        </span>
                      </span>
                    </button>
                  </div>
                
            </form>
          </div>
      </div>  

    </div>
  )
}

export default Login