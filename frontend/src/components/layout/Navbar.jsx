import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import smartPrepLogo from '../../assets/smartPrepLogo.jpg';

const Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem('authToken'); // Remove token from storage
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={smartPrepLogo} alt="Logo" className="h-10" />
        <Link to="/" className="text-3xl font-bold text-blue-600">SmartPrep</Link>
      </div>

      <div className="hidden md:flex space-x-10 text-lg font-medium">
        <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-500">About</Link>
        <Link to="/subjects" className="text-gray-700 hover:text-blue-500">Subjects</Link>
        <Link to="/tests" className="text-gray-700 hover:text-blue-500">Tests</Link>
      </div>

      <div className="flex items-center space-x-4">
        {auth ? (
          <>
            <Link to="/profile" className="bg-green-600 text-white px-4 py-2 rounded-md">
              Profile
            </Link>
            {/* {auth.role === 'admin' && (
              <Link to="/admin/users" className="bg-yellow-500 text-white px-4 py-2 rounded-md">
                Admin Panel
              </Link>
            )} */}
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md">
              Logout
            </button>
          </>
        ) : (
          <Link to="/sign-in" className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
