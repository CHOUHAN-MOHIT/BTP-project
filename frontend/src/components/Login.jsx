import React , {useEffect, useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { UserDetails } from '../Context/UserContext';
import facebookLogo from '../assets/logos/icons8-facebook-32.png'
import googleLogo from '../assets/logos/icons8-google-32.png'
import emailLogo from '../assets/logos/icons8-email-32.png'

const Login = ( { closeModal } ) => {
    const {auth ,setAuth} = UserDetails();
    const [email , setemail] = useState('');
    const [password , setpassword] = useState('');
    const navigate= useNavigate();
    const handleLogin = async (e) => {
      e.preventDefault();
  
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
  
          if (!response.ok) {
              // Handle non-2xx response (e.g., 401 Unauthorized)
              throw new Error(`Login failed with status: ${response.status}`);
          }
          // Assuming valid login
          setAuth(true);
          localStorage.setItem('isAuthenticated', true);
  
          // Call the closeModal function
          closeModal();
  
      } catch (error) {
          console.error('Error logging in:', error);
      }
  };
  
      
    useEffect(()=>{
        if(auth){
            navigate("/weddings");
        }
    },[auth]);
    return (
        <div className='pb-6 px-6'>
            <h3 className='text-center font-semibold text-lg mb-3'>Welcome Back</h3>
            <form onSubmit={handleLogin} className='flex flex-col'>
                <input type="email" name='email' placeholder='john@mymail.com' className='form-control'
                    onChange={e => setemail(e.target.value)}
                />
                <input type="password" name='password' placeholder='Password' className='form-control'
                    onChange={e => setpassword(e.target.value)}
                />
                <button className='border rounded-md p-2 mb-8 m-2 bg-highlight'>Login</button>
            </form>
            <div className="separator">or Login with</div>
            <div className='flex justify-around mt-8 m-4'>
                <img src={facebookLogo} alt="" srcset="" />
                <img src={googleLogo} alt="" srcset="" />
                <img src={emailLogo} alt="" srcset="" />
            </div>
       </div>
    )
}

export default Login