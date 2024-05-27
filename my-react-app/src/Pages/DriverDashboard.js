import React from 'react';
import { useNavigate } from 'react-router-dom';

function DriverDashboard() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/driver/home');
  };

  const handleRideHistoryClick = () => {
    navigate('/driver/ride-history');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="space-y-4">
        <button
          onClick={handleHomeClick}
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
        >
          Home
        </button>
        <button
          onClick={handleRideHistoryClick}
          className="w-full px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
        >
          Ride History
        </button>
      </div>
    </div>
  );
}

export default DriverDashboard;
