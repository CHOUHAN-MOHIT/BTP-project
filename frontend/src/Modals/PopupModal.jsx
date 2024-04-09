import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';
import WeddingRegister from '../components/WeddingRegister';

const PopupModal = ({ type, closeModal }) => {
  return (
    <div className="fixed flex justify-center items-center w-screen h-screen bg-[#00000080]">
        {type === 'register' && <Register closeModal={closeModal}/>}
        {type === 'login' && <Login closeModal={closeModal}/>}
        {type === 'registerWedding' && <WeddingRegister closeModal={closeModal}/>}
    </div>
  );
};

export default PopupModal;
