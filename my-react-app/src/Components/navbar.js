import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CustomerDashBoard from '../Pages/CustomerDashboard';
import DriverDashboard from '../Pages/DriverDashboard';
import { AuthContext } from '../Authentication/AuthContext';


function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setRole(localStorage.getItem('role') || '');

    const handleAuthChange = () => {
      const token = localStorage.getItem('authToken');
      setIsAuthenticated(!!token);
      setRole(localStorage.getItem('role') || '');
    };

    // Listen for login/logout events
    window.addEventListener('login', handleAuthChange);
    window.addEventListener('logout', handleAuthChange);

    return () => {
      window.removeEventListener('login', handleAuthChange);
      window.removeEventListener('logout', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    window.dispatchEvent(new Event('logout')); // Emit logout event
    navigate('/login');
  };

  const handleDashboardClick = () => {
    if (role === 'driver') {
      navigate('/driver/home/dashboard');
    } else if (role === 'customer') {
      navigate('/customer/home/dashboard');
    }
  };

  return (
    <nav className="bg-gray-300 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className='space-x-3'>
          {!isAuthenticated && (
            <>
              <Link to="/login" className="bg-red-100 px-4 py-2 rounded border-2 border-black text-black">LOGIN</Link>
              <Link to="/signup" className="bg-red-100 px-4 py-2 rounded border-2 border-black text-black">SIGNUP</Link>
            </>
          )}
        </div>
        {isAuthenticated && (
          <div className="flex items-center space-x-3">
            <button onClick={handleDashboardClick} className="bg-blue-500 px-4 py-2 rounded">
              Dashboard
            </button>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
// import React, { useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../Authentication/AuthContext';

// function Navbar() {
//   const navigate = useNavigate();
//   const { isAuthenticated, role, logout } = useContext(AuthContext);

//   const handleDashboardClick = () => {
//     if (role === 'driver') {
//       navigate('/driver/home/dashboard');
//     } else if (role === 'customer') {
//       navigate('/customer/home/dashboard');
//     }
//   };

//   return (
//     <nav className="bg-gray-300 p-4 text-white">
//       <div className="container mx-auto flex justify-between">
//         <div className='space-x-3'>
//           {!isAuthenticated && (
//             <>
//               <Link to="/login" className="bg-red-100 px-4 py-2 rounded">Login</Link>
//               <Link to="/signup" className="bg-red-100 px-4 py-2 rounded">Signup</Link>
//             </>
//           )}
//         </div>
//         {isAuthenticated && (
//           <div className="flex items-center space-x-3">
//             <button onClick={handleDashboardClick} className="bg-blue-500 px-4 py-2 rounded">
//               Dashboard
//             </button>
//             <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
