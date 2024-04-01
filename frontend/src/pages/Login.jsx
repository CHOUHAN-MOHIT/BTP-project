import React , {useEffect, useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import { UserDetails } from '../Context/UserContext';

const Login = () => {
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
    <div className='form-container'>
        <div className='login-card'>
            <h3 className='text-center'>Welcome Back</h3>
            <form onSubmit={handleLogin} className='login-form'>
                <input type="email" name='email' placeholder='john@mymail.com' className='form-control'
                    onChange={e => setemail(e.target.value)}
                />
                <input type="password" name='password' placeholder='Password' className='form-control'
                    onChange={e => setpassword(e.target.value)}
                />
                <button className='login-btn'>Login</button>
            </form>
            <div className="separator">or Login with</div>
            <div className='social-login'>
                <div>google</div>
                <div>Facebook</div>
                <div>Email</div>
            </div>
       </div>
    </div>
    )
}

export default Login