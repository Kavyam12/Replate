import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/images/logo.png';
import Button from './buttons.jsx'
import logicon from '../../assets/icons/logicon.png'
import regicon from '../../assets/icons/add.png'

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar'>
        <img src={logo} alt="Logo" className='logo'/>
        
        <ul>
            <li onClick={() => navigate('/')}>Home</li>
            <li onClick={() => navigate('/about')}>About</li>
            <li>
                <Button 
                    text="Login"
                    icon={<img src={logicon} alt="login" />}
                    onClick={() => navigate('/login')}
                />
            </li>
            <li>
                <Button 
                    text="Register"
                    variant="secondary"
                    icon={<img src={regicon} alt="registration" />}
                    onClick={() => navigate('/registration')}
                />
            </li>
        </ul>

    </div>
  )
}

export default Navbar