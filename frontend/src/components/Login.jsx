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
    const [error , setError] = useState({
        email:'',
        password:'',
        formError:''
    });
    useEffect(() => {
        isValid()
    } , [email , password]);
    const isValid = () => {
        let flag = true;
        if (!email) {
            setError(prevState => ({ ...prevState, email: 'Email is required.' }));
            flag = false;
        }
        else{
            setError(prevState => ({ ...prevState, email: '' }));
        }
        if (!password) {
            setError(prevState => ({ ...prevState, password: 'Password is required.' }));
            flag = false;
        }
        else{
            setError(prevState => ({ ...prevState, password: '' }));
        }
        return flag;
    }
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
                // Update the error state with the server-side error message
                setError({
                    formError: data.error || 'An error occurred.',
                    password: '',
                    email:''
                });
                return;
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
    
    return (
        <div className='pb-6 px-6'>
            <h3 className='text-center font-semibold text-lg mb-3'>Welcome Back</h3>
            <form onSubmit={handleLogin} className='flex flex-col'>
                <input type="email" name='email' placeholder='john@mymail.com' className='form-control' 
                    onChange={e => setemail(e.target.value)}
                />
                {error.email !== '' && <div className='mx-3 text-red-600 text-sm my-1'>* {error.email}</div>}
                <input type="password" name='password' placeholder='Password' className='form-control' 
                    onChange={e => setpassword(e.target.value)}
                />
                {error.password !== '' && <div className='mx-3 text-red-600 text-sm mt-1'>* {error.password}</div>}
                <button className='border rounded-md p-2 mt-6 mx-2 bg-highlight'>Login</button>
                {error.formError !== '' && <div className='mx-3 text-red-600 text-sm my-1'>* {error.formError}</div>}
            </form>
            <div className="separator mt-6">or Login with</div>
            <div className='flex justify-around mt-8 m-4'>
                <img src={facebookLogo} alt=""  />
                <img src={googleLogo} alt=""  />
                <img src={emailLogo} alt="" />
            </div>
       </div>
    )
}

export default Login