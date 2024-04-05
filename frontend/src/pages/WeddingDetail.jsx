import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const WeddingDetail = () => {
  const { id } = useParams();
  const [wedding, setWedding] = useState(null);
  const [events, setEvents] = useState([]);

  // Event component
  const Event = ({ name, date, location, description }) => (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h3>{name}</h3>
      <p>Date: {date}</p>
      <p>Location: {location}</p>
      <p>Description: {description}</p>
    </div>
  );

  const parseEvents = (eventsString, depth = 0) => {
    try {
      const parsedEvents = JSON.parse(eventsString);
      if (Array.isArray(parsedEvents)) {
        return parsedEvents;
      } else if (typeof parsedEvents === 'string' && depth < 3) {
        return parseEvents(parsedEvents, depth + 1);
      } else {
        console.error('Unable to parse events:', parsedEvents);
        return [];
      }
    } catch (error) {
      console.error('Error parsing events:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const response = await fetch(`http://localhost:8000/apis/weddings/${id}/`);
        if (!response.ok) {
          throw new Error(`Error fetching weddings: ${response.statusText}`);
        }
        const data = await response.json();
        setWedding(data);
      } catch (error) {
        console.error('Error fetching weddings:', error);
      }
    };

    fetchWeddings();

  }, [id]);
  const [imageUrl ,setImageUrl] =useState('http://127.0.0.1:8000');
  useEffect(() => {
    if(wedding && wedding.invitation_card)
    {
      setImageUrl('http://127.0.0.1:8000' + wedding.invitation_card);
    }
    if (wedding && wedding.events) {
      const parsedEvents = parseEvents(wedding.events);
      setEvents(parsedEvents);
    }
  }, [wedding]);

  return (
    <div>
      {wedding ? (
        <div>
          <h1>Wedding Details</h1>
          <p>Bride Name: {wedding.bride_name}</p>
          <p>Groom Name: {wedding.groom_name}</p>
          <p>Address: {wedding.address}</p>
          <p>City: {wedding.city}</p>
          <p>State: {wedding.state}</p>
          <p>Wedding Date: {wedding.wedding_date}</p>
          {wedding.invitation_card && (
            <div>
              <p>Invitation Card:</p>
              <img src={imageUrl} alt="Invitation Card" style={{ maxWidth: '100%' }} />
            </div>
          )}
          <h1>Events</h1>
          {events.length > 0 ? (
            events.map((event, index) => (
              <Event key={index} {...event} />
            ))
          ) : (
            <p>No events found.</p>
          )}
        </div>
      ) : (
        <p>Loading wedding details...</p>
      )}
    </div>
  );
};

export default WeddingDetail;
