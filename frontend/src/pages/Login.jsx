// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import "./Login.css"

// function Login() {
//   const navigate = useNavigate();

//   const redirectToHome = () => {
//     navigate('/home');
//   };
//   return (
//     <div>
//       <div className="login-box">
//         <div className="login-header">
//           <header>Login</header>
//         </div>

//         <div className="input-box">
//           <input type="text" className="input-field" placeholder="Email" autoComplete="off" required />
//         </div>

//         <div className="input-box">
//           <input type="password" className="input-field" placeholder="Password" autoComplete="off" required />
//         </div>

//         <div className="forgot">
//           <section>
//             <input type="checkbox" id="check" />
//             <label htmlFor="check">Remember me</label>
//           </section>
//         </div>

//         <div className="input-submit">
//           <button className="btn-17" onClick={redirectToHome}>
//             <span className="text-container">
//               <span className="text">Submit</span>
//             </span>
//           </button>
//         </div>

//         <div className="sign-up-link">
//           <p>Don't have account? <a href="/registration">Sign Up</a></p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login

import React from 'react'
import "./Login.css"
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate =  useNavigate();

  const redirectToHome = () => {
    navigate("/");
  };
  return (
    <div>

      <div className="login-box">

        <div className="login-header">
          <header>Login</header> 
        </div>

        <div className="input-field">
          <input type="text" className='input-field' placeholder='Email' autoComplete='off' required />
        </div>

        <div className="input-field">
          <input type="password" className='input-field' placeholder='Password' autoComplete='off' required />
        </div>

        <div className="remember-me">
          <section>
            <input type="checkbox" id='check' />
            <label htmlFor="check">Remember me</label>
          </section>
        </div>

        <div className="submit-btn">
          <buttoo className="btn-submit" onClick = {redirectToHome} >
            <span className="text">
              <span className="text-inside">
                Submit
              </span>
            </span>
          </buttoo>
        </div>
      </div>

    </div>
  )
}

export default Login