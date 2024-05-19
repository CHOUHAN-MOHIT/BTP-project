import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ( { setActiveTab }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setActiveTab('');
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch('http://localhost:8000/apis/payments/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPayments(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading payments data: {error.message}</div>;

  return (
    <div className="max-w-3xl mx-auto pt-32">
      <div className="grid grid-cols-1 gap-4">
        {payments.map((payment, index) => (
          <div key={index} className="bg-base rounded-lg overflow-hidden shadow-md">
            <Link to={`/wedding/${payment.wedding_id}`} className="block">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{payment.wedding_name}</h3>
                <p><strong>Bride:</strong> {payment.bride_name}</p>
                <p><strong>Groom:</strong> {payment.groom_name}</p>
                <p><strong>Wedding Date:</strong> {payment.wedding_date}</p>
                <p><strong>Address:</strong> {payment.address}, {payment.city}, {payment.state}</p>
                <p><strong>Amount Paid:</strong> {payment.amount}</p>
                <p><strong>Timestamp:</strong> {payment.timestamp}</p>
                <p><strong>Status:</strong> <span className=''>{payment.status}</span></p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
