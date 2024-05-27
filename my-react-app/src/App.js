
import Home from "./Components/Home"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Navbar from "./Components/navbar";
import Dashboard from "./Pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from './Authentication/AuthContext';
import ProtectedRoute from "./Authentication/ProtectedRoute";
import PublicRoute from './Authentication/PublicRoute';
import DriverHome from "./Components/DriverHome";
import CustomerHome from "./Components/CustomerHome";
import CustomerDashBoard from "./Pages/CustomerDashboard";
import DriverDashboard from "./Pages/DriverDashboard";
import DriverRideHistory from "./Components/DriverRideHistory";
import CustomerRideHistory from "./Components/CustomerRideHistory";


function App() {
  return (
    <div className="App">
      
        <Navbar/>
        <Routes>
          <Route path='/' element={<PublicRoute element={<Home />} />}/>
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route path="/signup" element={<PublicRoute element={<Signup />} />} />
          {/* <Route path="/home" element={<ProtectedRoute element={<Home />} />} /> */}
          {/* <Route path="/home" element={<ProtectedRoute element={<HomeRedirect />} />} /> */}

          {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> Add Dashboard route */}

          {/* <Route path="/driver/home" element={<ProtectedRoute element={<DriverHome />} />} />
          <Route path="/customer/home" element={<ProtectedRoute element={<CustomerHome />} />} /> */}
          <Route path="/driver/home" element={<ProtectedRoute element={<DriverHome />} />} />
        <Route path="/customer/home" element={<ProtectedRoute element={<CustomerHome />} />} />
        <Route path="/driver/home/dashboard" element={<DriverDashboard />} />
          <Route path="/customer/home/dashboard" element={<CustomerDashBoard />} />
          <Route path="/customer/ride-history" element={<CustomerRideHistory />} />
        <Route path="/driver/ride-history" element={<DriverRideHistory />} />
        </Routes>
        
    </div>
  );
}

// const HomeRedirect = ({ role }) => {
//   if (role === 'driver') {
//     return <Navigate to="/driver/home" />;
//   }
//   return <Navigate to="/customer/home" />;
// };

export default App;