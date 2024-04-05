import React, { useState } from 'react';

const EventDetails = ({ event, onRemove, onAddEvent }) => {
  const [eventName, setEventName] = useState(event?.name || '');
  const [eventDate, setEventDate] = useState(event?.date || '');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setEventName(value);
    } else if (name === 'date') {
      setEventDate(value);
    }
  };

  const handleAddEvent = () => {
    // Optional validation: Check if name and date are empty
    if (eventName && eventDate) {
      onAddEvent({ name: eventName, date: eventDate });
    } else {
      // Handle validation error (e.g., display an alert)
      console.error('Please enter event name and date');
    }
    setEventName(''); // Clear fields for new event
    setEventDate('');
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        value={eventName}
        onChange={handleInputChange}
        placeholder="Event Name"
        className="form-control"
      />
      <input
        type="date"
        name="date"
        value={eventDate}
        onChange={handleInputChange}
        placeholder="Event Date"
        className="form-control"
      />
      {onRemove && (
        <button type="button" onClick={onRemove} className="register-btn">
          Remove Event
        </button>
      )}
      {!onRemove && (
        <button type="button" onClick={handleAddEvent} className="register-btn">
          Add Event
        </button>
      )}
    </div>
  );
};

export default EventDetails;
