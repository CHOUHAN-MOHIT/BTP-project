import React, { useEffect, useState } from 'react';
import { UserDetails } from '../Context/UserContext';
import facebookLogo from '../assets/logos/icons8-facebook-32.png';
import googleLogo from '../assets/logos/icons8-google-32.png';
import closeIcon from '../assets/logos/icons8-close-48.png';
import emailLogo from '../assets/logos/icons8-email-32.png';
import passwordLogo from '../assets/logos/icons8-password-32.png';
import { useGlobalMessages } from '../Context/GlobalMessagesContext';

const Login = ({ closeModal }) => {
  const { auth, setAuth } = UserDetails();
  const { addMessage } = useGlobalMessages();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
    formError: ''
  });

  useEffect(() => {
    isValid();
  }, [email, password]);

  const isValid = () => {
    let flag = true;
    if (!email) {
      setError(prevState => ({ ...prevState, email: 'Email is required.' }));
      flag = false;
    } else {
      setError(prevState => ({ ...prevState, email: '' }));
    }
    if (!password) {
      setError(prevState => ({ ...prevState, password: 'Password is required.' }));
      flag = false;
    } else {
      setError(prevState => ({ ...prevState, password: '' }));
    }
    return flag;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValid()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/apis/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError({
          formError: data.error || 'An error occurred.',
          password: '',
          email: ''
        });
        return;
      }

      setAuth(true);
      localStorage.setItem('isAuthenticated', true);
      closeModal();
      addMessage('Login successful');

    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md w-80 mx-auto p-6">
      <div className="flex justify-end">
        <button onClick={closeModal} className="opacity-50 hover:opacity-100 rounded-full p-2 bg-gray-300 focus:outline-none">
          <img src={closeIcon} alt="Close" className="w-6 h-6" />
        </button>
      </div>
      <h3 className="text-center text-xl font-semibold mb-4">Welcome Back</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <div className="flex items-center py-2">
            <img src={emailLogo} alt="Email" className=" p-1 border border-r-0 rounded-md rounded-r-none" />
            <input 
              type="email" 
              name="email" 
              placeholder="john@mymail.com" 
              className="border border-l-0 rounded-md rounded-l-none p-2 w-full focus:outline-none" 
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
        </div>
        <div className="mb-4">
          <div className="flex items-center py-2">
            <img src={passwordLogo} alt="Password" className="p-1 border border-r-0 rounded-md rounded-r-none" />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              className="border border-l-0 rounded-md rounded-l-none p-2 w-full focus:outline-none" 
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error.password && <p className="text-red-500 text-sm mt-1">{error.password}</p>}
        </div>
        <button className="bg-orange-400 font-semibold rounded-md py-2 w-full mt-4 hover:bg-orange-500 focus:outline-none">
          Login
        </button>
        {error.formError && <p className="text-red-500 text-sm mt-2">{error.formError}</p>}
      </form>
      <div className="text-center mt-6">or Login with</div>
      <div className="flex justify-around mt-4">
        <img src={facebookLogo} alt="Facebook" className="w-8 h-8 cursor-pointer" />
        <img src={googleLogo} alt="Google" className="w-8 h-8 cursor-pointer" />
        <img src={emailLogo} alt="Email" className="w-8 h-8 cursor-pointer" />
      </div>
    </div>
  );
}

export default Login;
