import React , {useState} from 'react'
import './WeddingRegister.css'

const WeddingRegister = () => {
    const [brideName , setBrideName] = useState('');
    const [brideEmail , setBriderEmail] = useState('');
    const [bridePhone , setBridePhone] = useState('');
    const [groomEmail , setGroomEmail] = useState('');
    const [groomName , setGroomname] = useState('');
    const [groomPhone , setGroomPhone] = useState('');
    const [city , setCity] = useState('');
    const [address, sedAddress] = useState('');
    const [state , setState] = useState('');
    const [weddingDate , setWeddingDate] = useState('');
    const [invitationCard , setInvitationCard] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bride_name', brideName);
        formData.append('bride_email' , brideEmail);
        formData.append('bride_phone' ,bridePhone);
        formData.append( 'groom_phone' , groomPhone);
        formData.append( 'groom_email' , groomEmail);
        formData.append('groom_name' , groomName);
        formData.append('address' , address);
        formData.append('city' , city);
        formData.append('state' , state);
        formData.append('wedding_date' , weddingDate);
        formData.append('registration_date' , "2020-05-12");
        formData.append('invitation_card' , invitationCard);
        const response = await fetch('http://localhost:8000/apis/weddings/' , {
            method: 'POST',
            credentials:'include',
            body: formData
      });

      const content = await response.json();
    }
    return (
    <div className='reg-form-container'>
        <form className='wed-reg-form' onSubmit={handleLogin}>
        <h3 className='form-heading'>Register Your Wedding</h3>
            <div className='personal-details'>
                <input type="text" name='brideName' className='form-control' placeholder='BrideName' 
                    onChange={e => setBrideName(e.target.value)}
                />
                <input type="email" name='brideEmail' className='form-control' placeholder='BrideEmail'
                    onChange={e => setBriderEmail(e.target.value)}
                />
                <input type="text" name='bridePhone' className='form-control' placeholder='BridePhone' 
                    onChange={e => setBridePhone(e.target.value)}
                />
            </div>
            <div className='personal-details'>
                <input type="email" name='groomEmail' className='form-control' placeholder='GroomEmail'
                    onChange={e => setGroomEmail(e.target.value)}
                />
                <input type="text" name='GroomName' className='form-control' placeholder='GroomName'
                    onChange={e => setGroomname(e.target.value)}
                />
                <input type="text" name='GroomPhone' className='form-control' placeholder='GroomPhone' 
                    onChange={e => setGroomPhone(e.target.value)}
                />
            </div>
            <input type="text" name='address' className='form-control' placeholder='Address' 
                onChange={e => sedAddress(e.target.value)}
            />
            <div>
                <input type="text" name='city' className='form-control' placeholder='City'
                    onChange={e => setCity(e.target.value)}
                />
                <input type="text" name='state' className='form-control' placeholder='State'
                    onChange={e => setState(e.target.value)}
                />
                <input type="text" name='pincode' className='form-control' placeholder='Pincode' />
            </div>
            <div className='d-flex'>
                <input type="file" name='invitations-card' className='form-control'
                    onChange={e => {
                        const imgE = e.target;
                        setInvitationCard(imgE.files[0]);
                    }
                    }
                />
                <input type="date" name='weddingDate' className='form-control' 
                    onChange={e => setWeddingDate(e.target.value)}
                />
            </div>
            <button className='register-btn'>Register</button>
        </form>
    </div>
    )
}

export default WeddingRegister