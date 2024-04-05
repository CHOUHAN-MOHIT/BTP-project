import React , {useState} from 'react'
import './WeddingRegister.css'
import EventDetail from '../components/EventDetails';

const WeddingRegister = () => {
    //data variables
    const [formData, setFormData] = useState({
        brideName: '',
        brideEmail: '',
        bridePhone: '',
        groomEmail: '',
        groomName: '',
        groomPhone: '',
        city: '',
        address: '',
        state: '',
        weddingDate: '',
        invitationCard: null,
      });
    const [eventDetails, setEventDetails] = useState({
        eventName: '',
        eventDate: '',
        eventDesc: '',
      });
    const [formStep , setFormStep] = useState(0);
    //sub-components
    const eventDetailSection = () => {
        return (
        <div>
            <input type="text" name='eventName' className='form-control' placeholder='Address' 
                onChange={(e) => {
                    setEventDetails({
                      ...eventDetails,
                      [e.target.name]: e.target.value ? e.target.value : '',
                    });
                  }}
            />  
            <input type="date" name='eventDate' className='form-control' placeholder='City'
                onChange={(e) => {
                    setEventDetails({
                      ...eventDetails,
                      [e.target.name]: e.target.value ? e.target.value : '',
                    });
                  }}
            />
            <input type="text" name='eventDesc' className='form-control' placeholder='State'
                onChange={(e) => {
                    setEventDetails({
                      ...eventDetails,
                      [e.target.name]: e.target.value ? e.target.value : '',
                    });
                  }}
            />
        </div>)
    }
    //funtions
    const handleFormNav = (step) => {
        if(formStep + step >= 0)
            setFormStep(formStep+step);
    }
    const renderBtn = () => {
        if(formStep < 3)
            return (
                <div className='btn-grp'>
                    <button type='button' onClick={() => handleFormNav(-1)} className='register-btn'>Prev</button>
                    <button type='button' onClick={() => handleFormNav(1)} className='register-btn'>Next</button>
                </div>
            );
        else
            return (
                <div className='btn-grp'>
                <button type='button' onClick={() => handleFormNav(-1)} className='register-btn'>Prev</button>
                <button type='submit' onClick={handleWeddingRegistration} className='register-btn'>Register</button>
                </div>
            );
    }
    const handleWeddingRegistration = async () => {
        const _formData = new FormData();
        _formData.append('bride_name', formData.brideName);
        _formData.append('bride_email' , formData.brideEmail);
        _formData.append('bride_phone' ,formData.bridePhone);
        _formData.append('groom_phone' , formData.groomPhone);
        _formData.append('groom_email' , formData.groomEmail);
        _formData.append('groom_name' , formData.groomName);
        _formData.append('address' , formData.address);
        _formData.append('city' , formData.city);
        _formData.append('state' , formData.state);
        _formData.append('wedding_date' , formData.weddingDate);
        _formData.append('registration_date' , "2020-05-12");
        _formData.append('invitation_card' , formData.invitationCard);
        _formData.append('eventDetails', JSON.stringify(eventDetails)); // Convert eventDetails to JSON
        console.log(eventDetails);

        const response = await fetch('http://localhost:8000/apis/weddings/', {
          method: 'POST',
          credentials: 'include',
          body: _formData,
        });
      
        // const content = await response.json();
        setFormStep(0);
      };

    return (
    <div className='reg-form-container'>
        <form className='wed-reg-form' onSubmit={(event) => event.preventDefault()} >
            <h3 className='form-heading'>Register Your Wedding</h3>
            { formStep === 0 && (<section className='couple-details'>
                <h4 className='form-heading'>Bride Groom Details</h4>
                <div  >
                    <input type="text" name='brideName' className='form-control' placeholder='BrideName' 
                        onChange={e => setFormData({ ...formData, brideName: e.target.value })}
                    />
                    <input type="email" name='brideEmail' className='form-control' placeholder='BrideEmail'
                        onChange={e => setFormData({ ...formData, brideEmail: e.target.value })}
                    />
                    <input type="text" name='bridePhone' className='form-control' placeholder='BridePhone' 
                        onChange={e => setFormData({ ...formData, bridePhone: e.target.value })}
                    />
                </div>
                <div >
                    <input type="text" name='GroomName' className='form-control' placeholder='GroomName'
                        onChange={e => setFormData({ ...formData, groomName: e.target.value })}
                    />
                    <input type="email" name='groomEmail' className='form-control' placeholder='GroomEmail'
                        onChange={e => setFormData({ ...formData, groomEmail: e.target.value })}
                    />
                    <input type="text" name='GroomPhone' className='form-control' placeholder='GroomPhone' 
                        onChange={e => setFormData({ ...formData, groomPhone: e.target.value })}
                    />
                </div>
            </section>)}
            {formStep === 1 && (<section>
                <h4 className='form-heading'>Wedding Location</h4>
                <input type="text" name='address' className='form-control' placeholder='Address' 
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                />
                <input type="text" name='city' className='form-control' placeholder='City'
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                />
                <input type="text" name='state' className='form-control' placeholder='State'
                    onChange={e => setFormData({ ...formData, state: e.target.value })}
                />
                <input type="text" name='pincode' className='form-control' placeholder='Pincode' />
            </section>)}
            {formStep === 2 && (
                <section>
                    <h4 className="form-heading">Events details</h4>
                    {eventDetailSection()}
                    {/* {() => eventDetailSection()} */}
                </section>
                )}
            {formStep === 3 && (<section className='d-flex'>
                <h4 className='form-heading'>Additional Info</h4>
                <input type="file" name='invitations-card' className='form-control'
                    onChange={e => {
                        const imgE = e.target;
                        setFormData({ ...formData, invitationCard: imgE.files[0] });
                    }
                    }
                />
                <input type="date" name='weddingDate' className='form-control' 
                    onChange={e => setFormData({ ...formData, weddingDate: e.target.value })}
                />
            </section>)}    

            {renderBtn()}
            <section className='wed-reg-form' style={{display: "none"}}>
                <h3 className='text-center'>Event </h3>
                <input type="text" className='form-control' placeholder='Event name'/>
                <input type="text" className='form-control'placeholder='Event date'/>
                <input type="text" className='form-control'placeholder='Event description'/>
                <input type="text" className='form-control'placeholder='Dress code'/>
            </section>
        </form>
    </div>
    )
}

export default WeddingRegister