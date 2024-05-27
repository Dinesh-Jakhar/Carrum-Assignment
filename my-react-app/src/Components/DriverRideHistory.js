import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RideHistory() {
  const [rideHistory, setRideHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRideHistory = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await axios.get('http://localhost:4000/rides/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setRideHistory(response.data.rides);
        } else {
          setError(response.data.message);
          toast.error(response.data.message);
        }
      } catch (error) {
       // console.error('Error fetching ride history:', error);
        setError('Failed to fetch ride history.');
        toast.error('Failed to fetch ride history.');
      }
    };

    fetchRideHistory();
  }, []);

  const userId = localStorage.getItem('userId');

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Ride History</h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {rideHistory.length > 0 ? (
          <ul className="space-y-4">
            {rideHistory.map((ride) => (
              <li key={ride._id} className="p-4 bg-gray-50 rounded-lg shadow-inner">
                <p className="mb-2">
                  <span className="font-bold">Role:</span> {ride.user._id === userId ? 'Customer' : 'Driver'}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Customer:</span> {ride.user.firstname} {ride.user.lastname}
                </p>
                
                <p className="mb-2">
                  <span className="font-bold">From:</span> {ride.origin.lat}, {ride.origin.lng}
                </p>
                <p className="mb-2">
                  <span className="font-bold">To:</span> {ride.destination.lat}, {ride.destination.lng}
                </p>
                <p className="mb-2">
                  <span className="font-bold">Created at:</span> {new Date(ride.createdAt).toLocaleString()}
                </p>
                {ride.status === 'completed' && (
                  <p className="mb-2">
                    <span className="font-bold">Completed at:</span> {new Date(ride.updatedAt).toLocaleString()}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No completed rides available</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default RideHistory;
