import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const WeddingDetail = () => {
  const { id } = useParams();
  const [wedding, setWedding] = useState(null);
  const [events, setEvents] = useState([]);
  const [imageUrl, setImageUrl] = useState('http://127.0.0.1:8000');

  // Event component
  const Event = ({ name, date, location, description }) => (
    <div className="border rounded-lg border-gray-300 p-4">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">Date: {date}</p>
      <p className="text-sm text-gray-600">Location: {location}</p>
      <p className="text-sm text-gray-600">Description: {description}</p>
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

  useEffect(() => {
    if (wedding && wedding.invitation_card) {
      setImageUrl('http://127.0.0.1:8000' + wedding.invitation_card);
    }
    if (wedding && wedding.events) {
      const parsedEvents = parseEvents(wedding.events);
      setEvents(parsedEvents);
    }
  }, [wedding]);

  return (
    <div className="relative m-16 px-4 py-8 flex justify-around">
      <div className="space-y-8 basis-1/2">
        {wedding ? (
          <>
            <h1 className="text-3xl font-bold">{wedding.bride_name} & {wedding.groom_name}'s Wedding </h1> 
            {wedding.invitation_card && (
              <div className="mt-8">
                <img src={imageUrl} alt="Invitation Card" className="w-full rounded-lg shadow-lg mt-4" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p><span className="font-semibold">Bride Name:</span> {wedding.bride_name}</p>
                <p><span className="font-semibold">Groom Name:</span> {wedding.groom_name}</p>
                <p><span className="font-semibold">Address:</span> {wedding.address}</p>
              </div>
              <div>
                <p><span className="font-semibold">City:</span> {wedding.city}</p>
                <p><span className="font-semibold">State:</span> {wedding.state}</p>
                <p><span className="font-semibold">Wedding Date:</span> {wedding.wedding_date}</p>
              </div>
            </div>
            <h1 className="text-3xl font-bold mt-8">Events</h1>
            {events.length > 0 ? (
              events.map((event, index) => (
                <Event key={index} {...event} />
              ))
            ) : (
              <p className="text-lg">No events found.</p>
            )}
          </>
        ) : (
          <p className="text-xl">Loading wedding details...</p>
        )}
      </div>
      <div className="space-y-8 basis-1/4">
        <h1 className="text-3xl font-bold">Join Wedding</h1>
        <p className="text-lg">To join this wedding and celebrate with us, please proceed to the payment section.</p>
        {/* Add payment button or link here */}
      </div>
    </div>
  );
};

export default WeddingDetail;
