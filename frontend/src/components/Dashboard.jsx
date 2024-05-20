import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ setActiveTab }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // New state for filter

  useEffect(() => {
    setActiveTab("");
  }, [setActiveTab]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch("http://localhost:8000/apis/payments/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
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

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true;
    return payment.status === filter;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading payments data: {error.message}</div>;

  return (
    <div className="max-w-3xl mx-auto pt-32 pb-8">
      <div className="flex justify-between mb-4">
        <h2 className="text-3xl font-semibold">Weddings</h2>
        <div>
          <button
            className={`px-4 py-2 mr-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded ${
              filter === "succeeded" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("succeeded")}
          >
            Succeeded
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {filteredPayments.map((payment, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg overflow-hidden shadow-md hover:bg-gray-200"
          >
            <Link to={`/wedding/${payment.wedding_id}`} className="block">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {payment.wedding_name}
                </h3>
                <p>
                  <strong>Bride:</strong> {payment.bride_name}
                </p>
                <p>
                  <strong>Groom:</strong> {payment.groom_name}
                </p>
                <p>
                  <strong>Wedding Date:</strong> {payment.wedding_date}
                </p>
                <p>
                  <strong>Address:</strong> {payment.address}, {payment.city},{" "}
                  {payment.state}
                </p>
                <p>
                  <strong>Amount Paid:</strong> {payment.amount}
                </p>
                <p>
                  <strong>Timestamp:</strong> {payment.timestamp}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`capitalize ${
                      payment.status === "succeeded"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {payment.status}
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
