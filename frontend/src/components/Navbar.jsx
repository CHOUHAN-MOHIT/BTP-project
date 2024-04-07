import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { UserDetails } from '../Context/UserContext';
import Logo from '../assets/logos/logo-placeholder-image.png';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { auth, setAuth } = UserDetails();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const isAuth = storedAuth === 'true';
    setAuth(isAuth);
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:8000/apis/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    setAuth(null);
    localStorage.removeItem('isAuthenticated');
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  return (
    <>
      <nav className='flex justify-around bg-transparent absolute w-full top-0  p-2'>
        <div className='flex'>
          <img src={Logo} className='w-12 h-12'/>
          <div className='text-lg content-center mx-3 font-bold'>BRANDNAME</div>
        </div>
        <div className='flex'>
          <Link to='/' className='p-3'>Home</Link>
          <Link to='/weddings' className='p-3'>Weddings</Link>
          <Link to='/about-us' className='p-3'>About Us</Link>
          <Link to='/contact-us' className='p-3'>Contact Us</Link>
        </div>
        <div className='flex'>
          {auth ? (
            <>
              <Link className='btn backdrop-blur-sm bg-white/30' to='/register-wedding'>Be A Host</Link>
              <button className='btn backdrop-blur-sm bg-white/30' onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className='btn backdrop-blur-sm bg-white/30' onClick={() => openModal('register')}>
                Register
              </button>
              <button className='btn backdrop-blur-sm bg-white/30' onClick={() => openModal('login')}>
                Login
              </button>
            </>
          )}
        </div>
      </nav>
      {showModal && <AuthModal type={modalType} closeModal={closeModal} />}
    </>
  );
};

export default Navbar;
