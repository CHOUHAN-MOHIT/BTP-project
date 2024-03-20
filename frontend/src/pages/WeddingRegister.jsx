import React , {useState} from 'react'

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
    <div className='form-container'>
        <form className='login-form' onSubmit={handleLogin}>
            <input type="email" name='brideEmail' placeholder='BrideEmail'
                onChange={e => setBriderEmail(e.target.value)}
            />
            <input type="text" name='brideName' placeholder='brideName' 
                onChange={e => setBrideName(e.target.value)}
            />
            <input type="text" name='bridePhone' placeholder='bridePhone' 
                onChange={e => setBridePhone(e.target.value)}
            />
            <input type="email" name='groomEmail' placeholder='GroomEmail'
                onChange={e => setGroomEmail(e.target.value)}
            />
            <input type="text" name='GroomName' placeholder='GroomName'
                onChange={e => setGroomname(e.target.value)}
            />
            <input type="text" name='GroomPhone' placeholder='GroomPhone' 
                onChange={e => setGroomPhone(e.target.value)}
            />
            <input type="text" name='city' placeholder='city'
                onChange={e => setCity(e.target.value)}
            />
            <input type="text" name='address' placeholder='address' 
                onChange={e => sedAddress(e.target.value)}
            />
            <input type="text" name='state' placeholder='state'
                onChange={e => setState(e.target.value)}
            />
            <input type="text" name='weddingDate' placeholder='weddingDate' 
                onChange={e => setWeddingDate(e.target.value)}
            />
            <input type="file" name='invitations-card' id='invi-img'
                onChange={e => {
                    const imgE = e.target;
                    setInvitationCard(imgE.files[0]);
                }
                }
            />
            <button className='btn'>Login</button>
        </form>
    </div>
    )
}

export default WeddingRegister