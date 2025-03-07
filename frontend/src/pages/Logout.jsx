import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../App';
import Modal from '../components/Modal';

const Logout = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, message: '', type: '' });

  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
      setAuth(null);

      // Show logout success modal
      setModal({ open: true, message: 'Logged out successfully!', type: 'success' });

      setTimeout(() => {
        setModal({ open: false, message: '', type: '' });
        navigate('/');
      }, 3000); // Close modal and navigate after 2 seconds
    } catch (error) {
      console.error('Logout error:', error);
      setModal({ open: true, message: 'Logout failed. Please try again.', type: 'error' });

      setTimeout(() => {
        setModal({ open: false, message: '', type: '' });
      }, 2500);
    }
  };

  return (
    <>
      <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-md">
        Logout
      </button>

      {/* Show Modal if Open */}
      {modal.open && <Modal message={modal.message} type={modal.type} onClose={() => setModal({ open: false })} />}
    </>
  );
};

export default Logout;
