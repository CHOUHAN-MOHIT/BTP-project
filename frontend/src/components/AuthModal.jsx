import React from 'react';
import Register from './Register';
import Login from './Login';
import closeIcon from '../assets/logos/icons8-close-48.png'

const AuthModal = ({ type, closeModal }) => {
  return (
    <div className="fixed flex justify-center items-center w-screen h-screen bg-[#00000080]">
      <div className="border rounded w-1/4 bg-white">
        <div className='flex flex-row-reverse p-2'>
        <button onClick={closeModal} className='z-10 opacity-50 hover:opacity-100 right-0'><img className='w-6 h-6' src={closeIcon} alt="" /></button>
        </div >
        {type === 'register' && <Register closeModal={closeModal}/>}
        {type === 'login' && <Login closeModal={closeModal}/>}
      </div>
    </div>
  );
};

export default AuthModal;
