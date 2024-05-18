import React, { useState } from 'react';
import './WeddingRegister.css';
import closeIcon from '../assets/logos/icons8-close-48.png'
import { useGlobalMessages } from '../Context/GlobalMessagesContext';

const WeddingRegister = ( { closeModal } ) => {
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
    const titles = [
        'Bride & Groom Details',
        'Wedding Location',
        'Events',
        'Upload Invitation Card',
    ];
    const { addMessage } = useGlobalMessages();
    // Functions
    const handleFormNav = (step) => {
        if (formStep + step >= 0 && formStep + step <= 3) {
            setFormStep(formStep + step);
        }
    };

    const renderBtn = () => {
        if (formStep < 3) {
            return (
                <div className='flex justify-between mt-4'>
                    {formStep >0 
                        ? <button type='button' onClick={() => handleFormNav(-1)} className='bg-orange-600  px-4 py-3 rounded text-md w-1/2 mr-3'>
                                Prev
                            </button>
                        : <button></button>
                    }
                    <button type='button' onClick={() => handleFormNav(1)} className='bg-orange-600  px-4 py-3 rounded text-md w-1/2'>
                        Next
                    </button>
                </div>
            );
        } else {
            return (
                <div className='btn-grp flex justify-between mt-4'>
                    <button type='button' onClick={() => handleFormNav(-1)} className=' bg-orange-600  px-4 py-3 rounded text-md w-1/2 mr-3'>
                        Prev
                    </button>
                    <button type='submit' onClick={handleWeddingRegistration} className=' bg-orange-600  px-4 py-3 rounded text-md w-1/2'>
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
    const removeEvent = (indexToRemove) => {
        setFormData(prevData => ({
            ...prevData,
            events: prevData.events.filter((_, index) => index !== indexToRemove),
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
                addMessage('Wedding registered successfully');
                // closing the Model
                closeModal();
            } else {
                console.error('Failed to register wedding:', await response.text());
            }
        } catch (error) {
            console.error('Error registering wedding:', error);
        }
    };

    return (
        <div className="min-h-screen p-6 flex flex-col items-center justify-center">
            <div className="container max-w-screen-lg mx-auto bg-white rounded">
                <div className='flex flex-row-reverse p-2'>
                    <button onClick={closeModal} className='z-10 opacity-50 hover:opacity-100 right-0'><img className='w-6 h-6' src={closeIcon} alt="" /></button>
                </div >
                <h1 className='text-center text-2xl font-semibold'>Register Your Wedding</h1>
                <div>
                    <div className="rounded shadow-lg p-4 px-4 md:p-8">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="text-gray-600">
                            <p className="font-medium text-lg">{titles[formStep]}</p>
                            <p>Please fill out all the fields.</p>
                            </div>
            
                            <div className="lg:col-span-2 overflow-y-hidden max-h-screen">
                                {formStep === 0 && (
                                <section className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <input
                                            type="text"
                                            name="brideName"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Bride Name"
                                            value={formData.brideName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        <input
                                            type="email"
                                            name="brideEmail"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Bride Email"
                                            value={formData.brideEmail}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                        <input
                                            type="text"
                                            name="bridePhone"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="Bride Phone"
                                            value={formData.bridePhone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="md:col-span-5">
                                    <input
                                        type="text"
                                        name="groomName"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        placeholder="Groom Name"
                                        value={formData.groomName}
                                        onChange={handleChange}
                                    />
                                    </div>
                                    <div className="md:col-span-5">
                                    <input
                                        type="email"
                                        name="groomEmail"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        placeholder="Groom Email"
                                        value={formData.groomEmail}
                                        onChange={handleChange}
                                    />
                                    </div>
                                    <div className="md:col-span-5">
                                    <input
                                        type="text"
                                        name="groomPhone"
                                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                        placeholder="Groom Phone"
                                        value={formData.groomPhone}
                                        onChange={handleChange}
                                    />
                                    </div>
                                </section>)}
                                {formStep === 1 && (
                                <section className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <input type="text" name='address' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='Address'
                                        value={formData.address} onChange={handleChange} />
                                    </div>
                                    <div className="md:col-span-5">
                                        <input type="text" name='city' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='City'
                                        value={formData.city} onChange={handleChange} />
                                    </div>
                                    <div className="md:col-span-5">
                                        <input type="text" name='state' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder='State'
                                        value={formData.state} onChange={handleChange} />
                                    </div>
                                    <div className="md:col-span-5">
                                        <input type="date" name='weddingDate' className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                                        value={formData.weddingDate || ''} onChange={handleChange} />
                                    </div>
                                </section>)}
                                {formStep === 2 && (
                                    <section className="events-section overflow-y-auto max-h-[80vh]">
                                        {formData.events.map((event, index) => (
                                            <div key={index} className="event-card rounded-lg shadow-md bg-white p-4 mb-4">
                                                <div className="grid gap-4 text-sm grid-cols-1 md:grid-cols-5">
                                                    {/* Event details input fields */}
                                                    <div className="col-span-4 grid gap-2 md:grid-cols-2">
                                                        <div>
                                                            <label className="block text-gray-600 font-semibold">Event Name</label>
                                                            <input 
                                                                type="text" 
                                                                name={`name-${index}`} 
                                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 focus:outline-none focus:border-blue-500" 
                                                                placeholder="Event Name" 
                                                                value={event.name} 
                                                                onChange={handleChange} 
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-gray-600 font-semibold">Event Date</label>
                                                            <input 
                                                                type="date" 
                                                                name={`date-${index}`} 
                                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 focus:outline-none focus:border-blue-500" 
                                                                value={event.date || ''} 
                                                                onChange={handleChange} 
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-gray-600 font-semibold">Event Location</label>
                                                            <input 
                                                                type="text" 
                                                                name={`location-${index}`} 
                                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 focus:outline-none focus:border-blue-500" 
                                                                placeholder="Event Location" 
                                                                value={event.location} 
                                                                onChange={handleChange} 
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-gray-600 font-semibold">Event Description</label>
                                                            <input 
                                                                type="text" 
                                                                name={`description-${index}`} 
                                                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-100 focus:outline-none focus:border-blue-500" 
                                                                placeholder="Event Description" 
                                                                value={event.description} 
                                                                onChange={handleChange} 
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Remove Event Button */}
                                                    <div className="md:col-span-1 flex justify-center items-center">
                                                        <button 
                                                            type="button" 
                                                            className="remove-event-btn bg-red-600 text-white px-3 py-1 rounded"
                                                            onClick={() => removeEvent(index)}
                                                        >
                                                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+0lEQVR4nOWUvQ3CMBSE06SBJWACmAAmgAmIGCBMAA0lTEAmgAlgAH42yATQMQA0SIeMDgnjkJyjSAhxUgqf7vmLnZcXBH8hAFO4mpXZqBIFXwMYAUiZaz0MQSbLmlQJbxjueQD6rFkr4YTh+MWzjp6xHtFaKIDJe5egGDCnNVYAEcNLD8CK1kABdBneewAOtDoKoMnw0QNwotVQACGAG5+wCJCVVyDWGyEf4JxYAVh3inyA880UgNUVyAc4XacArL5GPsD5bxRAzKKE610GYPvpz690tqDE7DJFbXU6osT0NUV1ANfnXQu6AKjJAEKGAM7C5iYTeW3+U7oDdOEIwvGWUhkAAAAASUVORK5CYII="/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <button type='button' onClick={addEventSection} className='px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600'>
                                            <span className="font-semibold text-lg"> + </span> Add Event
                                        </button>
                                    </section>
                                )}
                                {formStep === 3 && (
                                    <>
                                    <section className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5'>
                                        <div className="md:col-span-5">
                                            <label for="invitationCard">Email Address</label>
                                            <input type="file" name='invitationCard' className='form-control bg-neutralAccent rounded p-2'
                                                onChange={(e) => setFormData({ ...formData, invitationCard: e.target.files[0] })} />
                                        </div>
                                    </section>
                                    </>
                                )}
                                {renderBtn()}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeddingRegister;
