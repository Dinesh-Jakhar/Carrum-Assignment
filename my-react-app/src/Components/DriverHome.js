
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const DriverHome = () => {
  const [pendingRides, setPendingRides] = useState([]);
  const [currentRide, setCurrentRide] = useState(null);
  const [error, setError] = useState(null);

  const fetchPendingRides = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:4000/rides/pending', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setPendingRides(response.data.rides || []);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
     // console.error('Error fetching pending rides', error);
      setError('An error occurred while fetching pending rides.');
    }
  };

  useEffect(() => {
    fetchPendingRides();
    const interval = setInterval(fetchPendingRides, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleAcceptRide = async (rideId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.patch(`http://localhost:4000/rides/${rideId}/accept`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setCurrentRide(response.data.ride);
        setPendingRides(pendingRides.filter(ride => ride._id !== rideId));
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error accepting ride', error);
      setError('An error occurred while accepting the ride.');
    }
  };

  const handleCompleteRide = async (rideId) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.patch(`http://localhost:4000/rides/${rideId}/complete`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        setCurrentRide(null);
        fetchPendingRides();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error completing ride', error);
      setError('An error occurred while completing the ride.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Pending Rides</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {currentRide ? (
          <div className="p-4 bg-blue-50 rounded-lg shadow-inner">
            <h2 className="text-xl font-semibold mb-2">Current Ride</h2>
            <p className="mb-2"><span className="font-bold">Customer:</span> {currentRide.user.firstname} {currentRide.user.lastname}</p>
            <p className="mb-2"><span className="font-bold">From:</span> {currentRide.origin.address} ({currentRide.origin.lat}, {currentRide.origin.lng})</p>
            <p className="mb-2"><span className="font-bold">To:</span> {currentRide.destination.address} ({currentRide.destination.lat}, {currentRide.destination.lng})</p>
            <p className="mb-2"><span className="font-bold">Requested at:</span> {new Date(currentRide.createdAt).toLocaleString()}</p>
            <button
              onClick={() => handleCompleteRide(currentRide._id)}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-green-600"
            >
              Complete Ride
            </button>
          </div>
        ) : (
          <>
            {pendingRides.length > 0 ? (
              <ul className="space-y-4">
                {pendingRides.map((ride, index) => (
                  <li key={ride._id} className="p-4 bg-gray-50 rounded-lg shadow-inner">
                    <p className="mb-2"><span className="font-bold">Customer:</span> {ride.user.firstname} {ride.user.lastname}</p>
                    <p className="mb-2"><span className="font-bold">From:</span> {ride.origin.address} ({ride.origin.lat}, {ride.origin.lng})</p>
                    <p className="mb-2"><span className="font-bold">To:</span> {ride.destination.address} ({ride.destination.lat}, {ride.destination.lng})</p>
                    <p className="mb-2"><span className="font-bold">Requested at:</span> {new Date(ride.createdAt).toLocaleString()}</p>
                    {index === 0 && (
                      <button
                        onClick={() => handleAcceptRide(ride._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-600"
                        disabled={!!currentRide}
                      >
                        Accept Ride
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">No pending rides available</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DriverHome;
