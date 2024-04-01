import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { UserDetails } from '../Context/UserContext'
import Logo from '../assets/logos/logo-placeholder-image.png'

const Navbar = () => {
  const {auth ,setAuth} = UserDetails();

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const isAuth = storedAuth === 'true'; // Check for exact value "true"
    setAuth(isAuth);
  }, []);
  const handleLogout = async () => {
    await fetch('http://localhost:8000/apis/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
    setAuth(null);
    localStorage.removeItem('isAuthenticated');
  }

  return (
    <nav className='nav-container'>
      <div className='brand'>
        <img src={Logo}  height="50px" className='logo'/>
        <div className='name'>BRANDNAME</div>
        </div>
      <div className='menu'>
        <Link to='/' className='nav-item'>Home</Link>
        <Link to='/weddings' className='nav-item'>Weddings</Link>
        <Link to='/about-us' className='nav-item'>About Us</Link>
        <Link to='/contact-us' className='nav-item'>Contact Us</Link>
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
    </nav>
  )
}

export default Navbar