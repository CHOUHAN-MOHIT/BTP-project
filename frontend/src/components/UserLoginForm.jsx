import './UserRegisterForm.css'
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';


function UserLoginForm(){
  const [formData , setFormData] = useState({
    email:'',
    password:''
  })
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLoginFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const getCsrfToken = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/apis/csrf_cookie');
        return response.data.csrf_token;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
        return "";
      }
    };
    
    const csrf_token = await getCsrfToken();
    console.log("csrfTokenReq:",csrf_token);
    Cookies.set('csrfToken', csrf_token, { expires: 1 });
      try {
          
        const response = await axios.post('http://127.0.0.1:8000/apis/login/', formData, {
          headers: {
            'X-CSRFToken': csrf_token
          }
        });
  
        console.log(response.data); 
        setSuccessMessage('Login successful!');
        localStorage.setItem("isAtuhenticated" , "true");

      } catch (error) {
        console.error(error);
        setErrorMessage('Login failed. Please try again.');

      }
    };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Username:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleLoginFormChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleLoginFormChange}
        />
      </div>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default UserLoginForm;