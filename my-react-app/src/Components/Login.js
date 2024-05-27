import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/bgLogin.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        toast.success('Logged in successfully!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('role', response.data.role);
        window.dispatchEvent(new Event('login')); 

            console.log(response.data.role);
        if (response.data.role === 'customer') {
            navigate('/customer/home');
          } else{
            navigate('/driver/home');
          }

        // navigate('/home');
      } else {
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('An error occurred.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white bg-opacity-80 p-5 border-2 border-vishnu rounded-lg shadow-lg w-full max-w-md">
        <div className="text-3xl font-bold mb-4 text-center bg-gray-100 text-black p-2 rounded">
          Sign In
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email address:</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-onHover hover:bg-vishnu text-white font-bold py-2 px-4 rounded">
            Log In
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
