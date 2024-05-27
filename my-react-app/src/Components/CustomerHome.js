

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from './MapComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerHome = () => {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [selecting, setSelecting] = useState('origin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ongoingRide, setOngoingRide] = useState(null); // Store ongoing ride details

  const checkCurrentRide = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.get('http://localhost:4000/rides/current', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.ride && response.data.ride.status !== 'completed') {
        setOngoingRide(response.data.ride);
      } else {
        setOngoingRide(null);
      }
    } catch (error) {
      console.error('Error checking current ride status:', error);
      //setError('Failed to check current ride status. Please try again.');
      //toast.error('Failed to check current ride status. Please try again.');
    }
  };

  useEffect(() => {
    checkCurrentRide();
    const interval = setInterval(checkCurrentRide, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleCreateRide = async () => {
    if (!origin || !destination) {
      setError('Please select both origin and destination');
      toast.error('Please select both origin and destination');
      return;
    }

    const token = localStorage.getItem('authToken');
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/rides',
        {
          origin: {
            lat: origin.latitude,
            lng: origin.longitude
          },
          destination: {
            lat: destination.latitude,
            lng: destination.longitude
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('Ride created successfully');
      setLoading(false);
      setError(null);
      setOngoingRide(response.data.ride);
    } catch (error) {
     // console.error('Error creating ride', error);
     // toast.error('Failed to create ride. Please try again.');
      setLoading(false);
    }
  };

  const handleSelectLocation = (location) => {
    if (selecting === 'origin') {
      setOrigin(location);
      setSelecting('destination');
    } else if (selecting === 'destination') {
      setDestination(location);
      setSelecting(null);
    }
  };

  return (
    <div className="p-4 flex justify-center row items-center min-h-screen bg-gray-100">
      <h1 className="w-full text-2xl font-bold mb-4 text-center rounded-lg">Create Ride</h1>
      <Map
        origin={origin}
        destination={destination}
        onSelectLocation={handleSelectLocation}
      />
      <div className="mt-4 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 rounded ${selecting === 'origin' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => setSelecting('origin')}
        >
          Set Origin
        </button>
        <button
          className={`px-4 py-2 rounded ${selecting === 'destination' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
          onClick={() => setSelecting('destination')}
        >
          Set Destination
        </button>
      </div>
      <div className="mt-4 text-center">
        {origin && <p>Origin: ({origin.latitude}, {origin.longitude})</p>}
        {destination && <p>Destination: ({destination.latitude}, {destination.longitude})</p>}
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      {ongoingRide ? (
        <div className="mt-4 p-4 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">Ongoing Ride</h2>
          <p>Driver: {ongoingRide.driver ? `${ongoingRide.driver.firstname} ${ongoingRide.driver.lastname}` : 'Awaiting driver...'}</p>
          <p>From: {ongoingRide.origin.lat}, {ongoingRide.origin.lng}</p>
          <p>To: {ongoingRide.destination.lat}, {ongoingRide.destination.lng}</p>
          <p>Status: {ongoingRide.status}</p>
          <p>{ongoingRide.status=='accepted' ? (<p className='text-green-500'>THANKS FOR USING CARRUM. ENJOY YOUR RIDE!!!</p>):(<p></p>)}</p>
        </div>
      ) : (
        <button
          className={`mt-4 px-4 py-2 rounded ${loading ? 'bg-gray-500' : 'bg-green-500'} text-white disabled:opacity-50`}
          onClick={handleCreateRide}
          disabled={!origin || !destination || loading}
        >
          {loading ? 'Processing...' : 'Ride Now'}
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default CustomerHome;
