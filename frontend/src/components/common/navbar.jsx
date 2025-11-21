import React from 'react';
import './navbar.css';
import logo from '../../assets/images/logo.png';
import Button from './buttons.jsx'
import logicon from '../../assets/icons/logicon.png'
import regicon from '../../assets/icons/add.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="Logo" className='logo'/>
        
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>
                <Button 
                    text="Login"
                    icon={<img src = {logicon} alt='login' />}
                />
            </li>
            <li>
                <Button 
                    text="Register"
                    variant="secondary"
                    icon={<img src = {regicon} alt='registration' />}
                />
            </li>
        </ul>

    </div>
  )
}

export default Navbar