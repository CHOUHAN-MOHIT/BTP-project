import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { UserDetails } from '../Context/UserContext'

const Navbar = () => {
  const {auth ,setAuth} = UserDetails();

  const handleLogout = async () => {
    await fetch('http://localhost:8000/apis/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
    setAuth(null);
  }

  return (
    <div className='nav-container'>
      <div className='brand'>BRANDNAME</div>
      <div className='menu'>
        <Link to='/' className='nav-item'>Home</Link>
        <Link to='/weddings' className='nav-item'>Weddings</Link>
        <span className='nav-item'>About Us</span>
        <span className='nav-item'>Contact Us</span>
      </div>
      <div className='auth-menu'>
      {
        auth ?<>
        <Link to='/register-wedding' className='nav-btn-inv'>Be a Host</Link>
        <Link to='/login' className='nav-btn'  onClick={handleLogout}>Logout</Link>
        </>
        :
        <>
        <Link to='/register' className='nav-btn'>Register</Link>
        <Link to='/login' className='nav-btn'>Login</Link>
        </>
      }
      
      
      </div>
    </div>
  )
}

export default Navbar