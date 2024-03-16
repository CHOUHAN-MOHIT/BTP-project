import './Navbar.css'
import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';



function Navbar() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') ;
  const handleLogout = async (event) => {
    event.preventDefault();
    const csrf_token = Cookies.get('csrfToken');
    console.log("handle logout:",csrf_token);
      try {
          
        const response = await axios.post('http://127.0.0.1:8000/apis/logout/', {
          headers: {
            'X-CSRF-TOKEN': csrf_token
          }
        });
  
        console.log(response.data); 
        localStorage.removeItem("isAtuhenticated");

      } catch (error) {
        console.error(error);        
      }
    };

  return (
    <nav className='nav-container'>
      {/* logo */}
      <div className='brand'>
          <img src="/" alt="/" />
          <div className='brand-name'><Link to="/">Brand Name</Link></div>
        </div>
      {/* Menu */}
      <div className='menu'>
        <div className='menu-items'><Link to="/about">About Us</Link></div>
        <div className='menu-items'> <Link to="/weddings">Weddings</Link></div>
        <div className='menu-items'><Link to="/contact">Contact Us</Link></div>
      </div>
      {/* login */}
      <div className='sec-menu'>
        <div className='menu-items'><Link to="/register">Register</Link></div>
        <div className='menu-items'><Link to="/login">Login</Link></div>
        <div className='menu-items'><button onClick={handleLogout}>Logout</button></div>
        
      </div>
    </nav>
  );
}

export default Navbar;