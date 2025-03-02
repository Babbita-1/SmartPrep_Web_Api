import React, { useState, useEffect, useContext } from 'react';
import api from '../../services/api';
import { AuthContext } from '../../App';

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/user');
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('Failed to load profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put(`/auth/users/${user._id}`, updatedUser);
      setUser(updatedUser);
      setEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update profile.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
      {editing ? (
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={updatedUser.name || ''}
            onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })}
          />
          <label className="block mt-4 mb-2">Academic Level</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={updatedUser.academicLevel || ''}
            onChange={(e) => setUpdatedUser({ ...updatedUser, academicLevel: e.target.value })}
          />
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>
            Save
          </button>
          <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={() => setEditing(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg"><strong>Name:</strong> {user.name}</p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
          <p className="text-lg"><strong>Academic Level:</strong> {user.academicLevel}</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
