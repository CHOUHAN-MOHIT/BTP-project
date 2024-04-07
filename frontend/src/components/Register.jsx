import React  , {useState} from 'react'
import './Register.css'

const Register = ( { closeModal } ) => {
    const [name , setname] = useState('');
    const [email , setemail] = useState('');
    const [password , setpassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:8000/apis/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });
    
            // Check if response is ok (HTTP status code in the range 200-299)
            if (!response.ok) {
                // Handle non-2xx response
                throw new Error(`Registration failed with status: ${response.status}`);
            }
    
            const content = await response.json();
            closeModal();
        } catch (error) {
            // Handle error
            console.error('Error registering user:', error.message);
            // You can also display an error message to the user if needed
            // For example, set an error state and display the message in your component
        }
    };
    
  return (
        <div className='pb-6 px-6'>
            <h3 className='text-center font-semibold text-lg mb-3'>Lets Explore Indian Weddings!!</h3>
            <form className='flex flex-col' onSubmit={handleRegister}>
                <input type="text" name='name' placeholder='Name' className='form-control'
                    onChange={e => setname(e.target.value)}
                />
                <input type="email" name='email' placeholder='john@mymail.com' className='form-control'
                    onChange={e => setemail(e.target.value)}
                />
                <input type="password" name='password' placeholder='Password' className='form-control'
                    onChange={e => setpassword(e.target.value)}
                />
                <button className='border rounded-md p-2 m-2 bg-shade'>Register</button>
            </form>
            <div className="separator">OR</div>
            <div className='text-center mt-4'>Already a Member? Login</div>
        </div>
  )
}

export default Register