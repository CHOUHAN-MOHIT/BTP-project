import React, { useState } from 'react';
import './WeddingRegister.css';

const WeddingRegister = () => {
    // Data variables
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
        weddingDate: null,
        invitationCard: null,
        events: [],
    });
    const [formStep, setFormStep] = useState(0);

    // Functions
    const handleFormNav = (step) => {
        if (formStep + step >= 0 && formStep + step <= 3) {
            setFormStep(formStep + step);
        }
    };

    const renderBtn = () => {
        if (formStep < 3) {
            return (
                <div className='btn-grp'>
                    <button type='button' onClick={() => handleFormNav(-1)} className='register-btn'>Prev</button>
                    <button type='button' onClick={() => handleFormNav(1)} className='register-btn'>Next</button>
                </div>
            );
        } else {
            return (
                <div className='btn-grp'>
                    <button type='button' onClick={() => handleFormNav(-1)} className='register-btn'>Prev</button>
                    <button type='submit' onClick={handleWeddingRegistration} className='register-btn'>Register</button>
                </div>
            );
        }
    };

    const addEventSection = () => {
        setFormData(prevData => ({
            ...prevData,
            events: [...prevData.events, { name: '', date: null, time: null, location: '', description: '' }],
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const [fieldName, fieldIndex] = name.split('-');

        if (fieldIndex !== undefined) {
            const eventIndex = parseInt(fieldIndex, 10);
            setFormData(prevData => ({
                ...prevData,
                events: prevData.events.map((event, index) =>
                    index === eventIndex ? { ...event, [fieldName]: value } : event
                ),
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleWeddingRegistration = async () => {
        try {
            const _formData = new FormData();
    
            // Convert events array to JSON string before appending to FormData
            const eventsJson = JSON.stringify(formData.events);
    
            _formData.append('bride_name', formData.brideName);
            _formData.append('bride_email', formData.brideEmail);
            _formData.append('bride_phone', formData.bridePhone);
            _formData.append('groom_name', formData.groomName);
            _formData.append('groom_email', formData.groomEmail);
            _formData.append('groom_phone', formData.groomPhone);
            _formData.append('address', formData.address);
            _formData.append('city', formData.city);
            _formData.append('state', formData.state);
            _formData.append('wedding_date', formData.weddingDate);
            _formData.append('events', eventsJson);
            _formData.append('invitation_card', formData.invitationCard);  // Append the file
    
            const response = await fetch('http://localhost:8000/apis/weddings/', {
                method: 'POST',
                credentials: 'include',
                body: _formData,
            });
    
            // Handle response
            if (response.ok) {
                setFormStep(0);
                console.log('Wedding registered successfully');
            } else {
                // Handle error
                console.error('Failed to register wedding:', await response.text());
            }
        } catch (error) {
            console.error('Error registering wedding:', error);
        }
    };
    
    
    
    
    

    return (
        <div className='reg-form-container'>
            <form className='wed-reg-form' onSubmit={(event) => event.preventDefault()}>
                <h3 className='form-heading'>Register Your Wedding</h3>
                
                {/* Couple details section */}
                {formStep === 0 && (
                    <>
                    <h5 className='text-center'>Bride Groom Details</h5>
                    <section className='couple-details'>
                        <div>
                        <input type="text" name='brideName' className='form-control' placeholder='BrideName'
                            value={formData.brideName} onChange={handleChange} />
                        <input type="email" name='brideEmail' className='form-control' placeholder='BrideEmail'
                            value={formData.brideEmail} onChange={handleChange} />
                        <input type="text" name='bridePhone' className='form-control' placeholder='BridePhone'
                            value={formData.bridePhone} onChange={handleChange} />
                        </div>
                        <div>
                        <input type="text" name='groomName' className='form-control' placeholder='GroomName'
                            value={formData.groomName} onChange={handleChange} />
                        <input type="email" name='groomEmail' className='form-control' placeholder='GroomEmail'
                            value={formData.groomEmail} onChange={handleChange} />
                        <input type="text" name='groomPhone' className='form-control' placeholder='GroomPhone'
                            value={formData.groomPhone} onChange={handleChange} />
                        </div>
                    </section>
                    </>
                )}
                
                {/* Geographic details */}
                {formStep === 1 && (
                    <>
                    <h5 className='text-center'>Wedding Location</h5>
                    <section>
                        <input type="text" name='address' className='form-control' placeholder='Address'
                            value={formData.address} onChange={handleChange} />
                        <input type="text" name='city' className='form-control' placeholder='City'
                            value={formData.city} onChange={handleChange} />
                        <input type="text" name='state' className='form-control' placeholder='State'
                            value={formData.state} onChange={handleChange} />
                    </section>
                    </>
                )}
                
                {/* Event details */}
                {formStep === 2 && (
                    <>
                    <h4 className="text-center">Events details</h4>
                    <section>
                        {formData.events.map((event, index) => (
                            <div key={index}>
                                <input type="text" name={`name-${index}`} className='form-control' placeholder='Event Name'
                                    value={event.name} onChange={handleChange} />
                                <input type="date" name={`date-${index}`} className='form-control' placeholder='Event Date'
                                    value={event.date || ''} onChange={handleChange} />
                                <input type="text" name={`location-${index}`} className='form-control' placeholder='Event Location'
                                    value={event.location} onChange={handleChange} />
                                <input type="text" name={`description-${index}`} className='form-control' placeholder='Event Description'
                                    value={event.description} onChange={handleChange} />
                            </div>
                        ))}
                        <button type='button' onClick={addEventSection} className='register-btn'><span style={{fontWeight:"800",fontSize:"large"}}> + </span>Add event</button>
                    </section>
                    </>
                )}
                
                {/* Additional Info */}
                {formStep === 3 && (
                    <>
                    <h4 className='text-center'>Additional Info</h4>
                    <section className='d-flex'>
                        <input type="file" name='invitationCard' className='form-control'
                            onChange={(e) => setFormData({ ...formData, invitationCard: e.target.files[0] })} />
                        <input type="date" name='weddingDate' className='form-control'
                            value={formData.weddingDate || ''} onChange={handleChange} />
                    </section>
                    </>
                )}

                {renderBtn()}
            </form>
        </div>
    );
};

export default WeddingRegister;
