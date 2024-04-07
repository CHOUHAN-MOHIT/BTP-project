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
                <div className='btn-grp flex justify-between mt-4'>
                    <button type='button' onClick={() => handleFormNav(-1)} className='register-btn bg-highlight  px-4 py-2 rounded'>
                        Prev
                    </button>
                    <button type='button' onClick={() => handleFormNav(1)} className='register-btn bg-highlight  px-4 py-2 rounded'>
                        Next
                    </button>
                </div>
            );
        } else {
            return (
                <div className='btn-grp flex justify-between mt-4'>
                    <button type='button' onClick={() => handleFormNav(-1)} className='register-btn bg-highlight  px-4 py-2 rounded'>
                        Prev
                    </button>
                    <button type='submit' onClick={handleWeddingRegistration} className='register-btn bg-highlight  px-4 py-2 rounded'>
                        Register
                    </button>
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
            _formData.append('invitation_card', formData.invitationCard);
    
            const response = await fetch('http://localhost:8000/apis/weddings/', {
                method: 'POST',
                credentials: 'include',
                body: _formData,
            });
    
            if (response.ok) {
                setFormStep(0);
                console.log('Wedding registered successfully');
            } else {
                console.error('Failed to register wedding:', await response.text());
            }
        } catch (error) {
            console.error('Error registering wedding:', error);
        }
    };

    return (
        <div className='pt-16 bg-base p-6 rounded-lg'>
            <form className='wed-reg-form' onSubmit={(event) => event.preventDefault()}>
                <h3 className='form-heading text-center text-2xl mb-4'>Register Your Wedding</h3>
                
                {/* Couple details section */}
                {formStep === 0 && (
                    <>
                    <h5 className='text-center text-lg mb-2'>Bride Groom Details</h5>
                    <section className='couple-details grid grid-cols-2 gap-4 mb-4'>
                        <div className='flex flex-col'>
                            <input type="text" name='brideName' className='form-control bg-neutralAccent rounded p-2' placeholder='Bride Name'
                                value={formData.brideName} onChange={handleChange} />
                            <input type="email" name='brideEmail' className='form-control bg-neutralAccent rounded p-2 mt-2' placeholder='Bride Email'
                                value={formData.brideEmail} onChange={handleChange} />
                            <input type="text" name='bridePhone' className='form-control bg-neutralAccent rounded p-2 mt-2' placeholder='Bride Phone'
                                value={formData.bridePhone} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col'>
                            <input type="text" name='groomName' className='form-control bg-neutralAccent rounded p-2' placeholder='Groom Name'
                                value={formData.groomName} onChange={handleChange} />
                            <input type="email" name='groomEmail' className='form-control bg-neutralAccent rounded p-2 mt-2' placeholder='Groom Email'
                                value={formData.groomEmail} onChange={handleChange} />
                            <input type="text" name='groomPhone' className='form-control bg-neutralAccent rounded p-2 mt-2' placeholder='Groom Phone'
                                value={formData.groomPhone} onChange={handleChange} />
                        </div>
                    </section>
                    </>
                )}
                
                {/* Geographic details */}
                {formStep === 1 && (
                    <>
                    <h5 className='text-center text-lg mb-2'>Wedding Location</h5>
                    <section className='grid grid-cols-1 gap-4 mb-4'>
                        <input type="text" name='address' className='form-control bg-neutralAccent rounded p-2' placeholder='Address'
                            value={formData.address} onChange={handleChange} />
                        <input type="text" name='city' className='form-control bg-neutralAccent rounded p-2 mt-2' placeholder='City'
                            value={formData.city} onChange={handleChange} />
                        <input type="text" name='state' className='form-control bg-neutralAccent rounded p-2 mt-2' placeholder='State'
                            value={formData.state} onChange={handleChange} />
                    </section>
                    </>
                )}
                
                {/* Event details */}
                {formStep === 2 && (
                    <>
                    <h4 className="text-center text-xl mb-2">Events details</h4>
                    <section className='mb-4'>
                        {formData.events.map((event, index) => (
                            <div key={index} className='grid grid-cols-2 gap-4 mb-4'>
                                <input type="text" name={`name-${index}`} className='form-control bg-neutralAccent rounded p-2' placeholder='Event Name'
                                    value={event.name} onChange={handleChange} />
                                <input type="date" name={`date-${index}`} className='form-control bg-neutralAccent rounded p-2 mt-2' placeholder='Event Date'
                                    value={event.date || ''} onChange={handleChange} />
                                <input type="text" name={`location-${index}`} className='form-control bg-neutralAccent rounded p-2 mt-2' placeholder='Event Location'
                                    value={event.location} onChange={handleChange} />
                                <input type="text" name={`description-${index}`} className='form-control bg-neutralAccent rounded p-2 mt-2' placeholder='Event Description'
                                    value={event.description} onChange={handleChange} />
                            </div>
                        ))}
                        <button type='button' onClick={addEventSection} className='register-btn bg-highlight text-base text-white px-4 py-2 rounded'>
                            <span style={{ fontWeight: "800", fontSize: "large" }}> + </span> Add event
                        </button>
                    </section>
                    </>
                )}
                
                {/* Additional Info */}
                {formStep === 3 && (
                    <>
                    <h4 className='text-center text-xl mb-2'>Additional Info</h4>
                    <section className='grid grid-cols-1 gap-4 mb-4'>
                        <input type="file" name='invitationCard' className='form-control bg-neutralAccent rounded p-2'
                            onChange={(e) => setFormData({ ...formData, invitationCard: e.target.files[0] })} />
                        <input type="date" name='weddingDate' className='form-control bg-neutralAccent rounded p-2 mt-2'
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
