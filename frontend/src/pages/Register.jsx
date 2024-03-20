import React  , {useState} from 'react'
import './Register.css'

const Register = () => {
    const [name , setname] = useState('');
    const [email , setemail] = useState('');
    const [password , setpassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8000/apis/register' , {
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const content = await response.json();
        console.log(content);
    }
  return (
    <div className='form-container'>
        <div className='register-card'>
            <h3 className='text-center'>Lets Explore Indian Weddings!!</h3>
        <form className='register-form' onSubmit={handleRegister}>
            <input type="text" name='name' placeholder='Name' className='form-control'
                onChange={e => setname(e.target.value)}
            />
            <input type="email" name='email' placeholder='john@mymail.com' className='form-control'
                onChange={e => setemail(e.target.value)}
            />
            <input type="password" name='password' placeholder='Password' className='form-control'
                onChange={e => setpassword(e.target.value)}
            />
            <button className='register-btn'>Register</button>
        </form>
        </div>
    </div>
  )
}

export default Register