import './UserRegisterForm.css';
import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for backend communication
import Cookies from 'js-cookie';

const UserRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
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
  Cookies.set('csrfToken', csrf_token, { expires: 1 });
  if (formData.password !== formData.confirm_password) {
    setErrorMessage('Passwords do not match.');
    return;
  }
    try {
        
      const response = await axios.post('http://127.0.0.1:8000/apis/registration/', formData, {
        headers: {
          'X-CSRFToken': csrf_token
        }
      });

      console.log(response.data); 
      setSuccessMessage('Registration successful!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Registration failed. Please try again.');
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          placeholder="0000000000"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Minimum 8 characters"
        />
      </div>
      <div>
        <label htmlFor="confirm_password">Confirm Password:</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegisterForm;
