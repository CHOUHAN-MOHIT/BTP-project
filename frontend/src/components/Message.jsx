// Message.js
import React , { useEffect } from 'react';
import closeIcon from '../assets/logos/icons8-close-48.png';

const Message = ({ message, onClose , type="info" }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
          onClose();
        }, 5000); // 5000 milliseconds = 5 seconds
    
        return () => clearTimeout(timer); // Clear the timer when the component unmounts
      }, [onClose]);
    return (
      <div className="py-2 px-3 shadow-md mb-1 flex justify-between items-center bg-sky-300 rounded">
        <span className='px-2'>{message}</span>
        <button onClick={onClose} className="opacity-50 hover:opacity-100 rounded-full p-1 bg-gray-300 focus:outline-none">
          <img src={closeIcon} alt="Close" className="w-4 h-4" />
        </button>
      </div>
    );
  };
  
export default Message;
