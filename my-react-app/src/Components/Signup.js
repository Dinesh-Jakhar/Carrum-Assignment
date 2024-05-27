import React, { useState } from 'react';
import axios from 'axios';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import backgroundImage from '../assets/bgSignup.webp'
import {  useNavigate } from 'react-router-dom';
import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("customer");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null); 
    // const history = useHistory();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:4000/signup", {
                email,
                password,
                firstname,
                lastname,
                role,
            });
            if (response.data.success) { // Check for successful response
                console.log("API response:", response.data);
                // localStorage.setItem('authToken', response.data.token);
                // localStorage.setItem('role', role);
                // if (role === 'customer') {
                //     navigate('/customer/home');
                // } else {
                //     navigate('/driver/home');
                // }
                toast.success('User Created successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                //navigate('/login');
            } else {
                setError(response.data.message); // Set error message from response
            }
            
            
        } catch (error) {
            console.error("Error making API call:", error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="bg-white bg-opacity-80 p-6 border-2 border-vishnu rounded-lg shadow-lg w-full max-w-md">
                <div className="text-2xl font-bold mb-4 text-center bg-gray-100 text-black p-2 rounded">
                    Create an Account
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex mb-4 space-x-4'>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">First Name:</label>
                        <input
                            type="text"
                            placeholder="Enter first name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
                        <input
                            type="text"
                            placeholder="Enter last name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                    </div>
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
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 font-bold mb-2">Password:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        <span className="absolute top-11 right-0 pr-3 flex items-center text-vishnu cursor-pointer" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Role:</label>
                        <div className="flex items-center mb-2">
                            <input
                                type="radio"
                                value="driver"
                                checked={role === 'driver'}
                                onChange={(e) => setRole(e.target.value)}
                                className="custom-radio mr-2"
                            />
                            <span className="text-gray-700">Driver</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                value="customer"
                                checked={role === 'customer'}
                                onChange={(e) => setRole(e.target.value)}
                                className="custom-radio mr-2"
                            />
                            <span className="text-gray-700">Customer</span>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-vishnu hover:bg-onHover text-white font-bold py-2 px-4 rounded">
                        Sign Up
                    </button>
                </form>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Signup;
