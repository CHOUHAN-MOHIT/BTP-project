import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import backIcon from '../assets/logos/icons8-back-arrow-50.png'
const WeddingDetail = () => {
  const { id } = useParams();
  const [wedding, setWedding] = useState(null);
  const [events, setEvents] = useState([]);
  const [imageUrl, setImageUrl] = useState("http://127.0.0.1:8000");
  const [guests, setGuests] = useState(1);
  const pricePerGuest = 50; // Example price per guest
  const serviceCharge = 20; // Example service charge

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
      } else if (typeof parsedEvents === "string" && depth < 3) {
        return parseEvents(parsedEvents, depth + 1);
      } else {
        console.error("Unable to parse events:", parsedEvents);
        return [];
      }
    } catch (error) {
      console.error("Error parsing events:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/apis/weddings/${id}/`
        );
        if (!response.ok) {
          throw new Error(`Error fetching weddings: ${response.statusText}`);
        }
        const data = await response.json();
        setWedding(data);
      } catch (error) {
        console.error("Error fetching weddings:", error);
      }
    };

    fetchWeddings();
  }, [id]);

  useEffect(() => {
    if (wedding && wedding.invitation_card) {
      setImageUrl("http://127.0.0.1:8000" + wedding.invitation_card);
    }
    if (wedding && wedding.events) {
      const parsedEvents = parseEvents(wedding.events);
      setEvents(parsedEvents);
    }
  }, [wedding]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:8000/apis/create_order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          wedding_id: id,
          amount: totalAmount * 100, // Convert to smallest currency unit
        }),
      });

      if (!response.ok) {
        throw new Error(`Error creating order: ${response.statusText}`);
      }

      const paymentData = await response.json();

      const options = {
        key: paymentData.key,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: paymentData.name,
        description: paymentData.description,
        order_id: paymentData.order_id,
        prefill: paymentData.prefill,
        notes: paymentData.notes,
        theme: {
          color: "#3399cc",
        },
        handler: function (response) {
          handlePaymentSuccess(response);
        },
        modal: {
          ondismiss: function () {
            console.log("Checkout form closed");
          },
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const successResponse = await fetch(
        "http://localhost:8000/apis/payment_success/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust this line based on your auth setup
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        }
      );

      if (!successResponse.ok) {
        throw new Error(
          `Error processing payment success: ${successResponse.statusText}`
        );
      }

      alert("Payment Successful");
    } catch (error) {
      console.error("Error processing payment success:", error);
    }
  };

  const handleGuestChange = (e) => {
    setGuests(e.target.value);
  };
  const incrementGuests = () => setGuests(guests + 1);
  const decrementGuests = () => setGuests(guests > 1 ? guests - 1 : 1);

  const totalAmount = pricePerGuest * guests + serviceCharge;

  return (
    <div className="relative m-16 px-4 py-8 flex justify-around">
      <div className="space-y-8 basis-1/2">
        {wedding ? (
          <>
            <div className="flex flex-row items-center space-x-2">
              <button onClick={() => window.history.back()} className="bg-base hover:bg-highlight rounded-full w-9 h-9"><img src={backIcon} alt="back icon" /></button>
              <h1 className="text-3xl font-bold">
                {wedding.bride_name} & {wedding.groom_name}'s Wedding{" "}
              </h1>
            </div>
            {wedding.invitation_card && (
              <div className="mt-8">
                <img
                  src={imageUrl}
                  alt="Invitation Card"
                  className="w-full rounded-lg shadow-lg mt-4 max-w-xl max-h-96 object-contain"
                />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p>
                  <span className="font-semibold">Bride Name:</span>{" "}
                  {wedding.bride_name}
                </p>
                <p>
                  <span className="font-semibold">Groom Name:</span>{" "}
                  {wedding.groom_name}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {wedding.address}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">City:</span> {wedding.city}
                </p>
                <p>
                  <span className="font-semibold">State:</span> {wedding.state}
                </p>
                <p>
                  <span className="font-semibold">Wedding Date:</span>{" "}
                  {wedding.wedding_date}
                </p>
              </div>
            </div>
            <h1 className="text-3xl font-bold mt-8">Events</h1>
            {events.length > 0 ? (
              events.map((event, index) => <Event key={index} {...event} />)
            ) : (
              <p className="text-lg">No events found.</p>
            )}
          </>
        ) : (
          <p className="text-xl">Loading wedding details...</p>
        )}
      </div>
      <div className="space-y-4 basis-1/4">
        <h1 className="text-2xl font-bold">Join Our Celebration of Love</h1>
        <p className="">
          We are honored to invite you to join us in our joyous wedding
          celebrations. As a token of love and blessings, you may choose to
          contribute shagun to the bride and groom.
        </p>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm">
            <span>Price per Guest</span>
            <span>${pricePerGuest}</span>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Number of Guests</span>
            <div className="text-lg font-semibold">
              <div className="flex items-center">
                <button
                  onClick={decrementGuests}
                  className="bg-gray-300 text-gray-800 px-4 py-1 rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-2 bg-white text-sm">{guests}</span>
                <button
                  onClick={incrementGuests}
                  className="bg-gray-300 text-gray-800 px-4 py-1 rounded-r"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>Service Charge</span>
            <span>${serviceCharge}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold mt-4">
            <span>Total Amount</span>
            <span>${totalAmount}</span>
          </div>
        </div>
        <button
          onClick={handlePayment}
          className="mt-6 w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Pay ${totalAmount}
        </button>
      </div>
    </div>
  );
};

export default WeddingDetail;
