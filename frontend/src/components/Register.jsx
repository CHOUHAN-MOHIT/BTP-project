import React  , {useState , useEffect } from 'react'
import './Register.css'

const Register = ( { closeModal } ) => {
    const [formData , setFormData] = useState({
        name:'',
        email:'',
        password:'',
    })
    const [error , setError] = useState({
        name:'',
        email:'',
        password:'',
        formError:'',
    })
    const [rePassword , setRePassword] = useState('');
    const [rePasswordError , setRePasswordError] = useState('');

    useEffect(() => {
        isValid()
    } , [formData , rePassword]);
    const isValid = () => {
        let flag = true;
        if (!formData.name) {
            setError(prevState => ({ ...prevState, name: 'Email is required.' }));
            flag = false;
        }
        else{
            setError(prevState => ({ ...prevState, name: '' }));
        }
        if (!formData.email) {
            setError(prevState => ({ ...prevState, email: 'Email is required.' }));
            flag = false;
        }
        else{
            setError(prevState => ({ ...prevState, email: '' }));
        }
        if (!formData.password) {
            setError(prevState => ({ ...prevState, password: 'Password is required.' }));
            flag = false;
        }
        else{
            setError(prevState => ({ ...prevState, password: '' }));
        }
        if (!rePassword) {
            setRePasswordError('Password is required.' );
            flag = false;
        }
        else{
            setRePasswordError('');
        }
        if((formData.password && rePassword) && formData.password !== rePassword)
        {
            setRePasswordError('Password and confirm password do not match.' );
            flag = false;
        }
        else if((formData.password && rePassword) && formData.password === rePassword)
        {
            setRePasswordError('' );
        }
        return flag;
    }
    const handleRegister = async (e) => {
        e.preventDefault();
        if(!isValid()){
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/apis/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
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
                    onChange={e => setFormData({...formData , name:e.target.value})}
                />
                {error.name !== '' && <div className='mx-3 text-red-600 text-sm mt-1'>* {error.name}</div>}
                <input type="email" name='email' placeholder='john@mymail.com' className='form-control'
                    onChange={e => setFormData({...formData , email:e.target.value})}
                />
                {error.email !== '' && <div className='mx-3 text-red-600 text-sm mt-1'>* {error.email}</div>}
                <input type="password" name='password' placeholder='Password' className='form-control'
                    onChange={e => setFormData({...formData , password:e.target.value})}
                />
                {error.password !== '' && <div className='mx-3 text-red-600 text-sm mt-1'>* {error.password}</div>}
                <input type="password" name='re-password' placeholder='Re-Password' className='form-control'
                    onChange={e => setRePassword(e.target.value)}
                />
                {rePasswordError !== '' && <div className='mx-3 text-red-600 text-sm mt-1'>* {rePasswordError}</div>}

                <button className='border rounded-md p-2 mx-2 my-4 hover:bg-shade bg-orange-300'>Register</button>
                {error.formError !== '' && <div className='mx-3 text-red-600 text-sm mt-1'>* {error.formError}</div>}
            </form>
            <div className="separator">OR</div>
            <div className='text-center mt-4'>Already a Member? Login</div>
        </div>
  )
}

export default Register