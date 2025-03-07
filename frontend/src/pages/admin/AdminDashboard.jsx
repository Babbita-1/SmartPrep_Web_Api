import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">Admin Dashboard</h1>
      <p className="text-gray-700 text-center mb-6">Manage users, subjects, resources, and tests.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Users */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-blue-700">User Management</h3>
          <button
            onClick={() => navigate('/admin/users')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Manage Users
          </button>
        </div>

        {/* Add Subjects */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-blue-700">Subjects</h3>
          <button
            onClick={() => navigate('/admin/add-subject')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Subject
          </button>
        </div>

        {/* Add Resources */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-blue-700">Resources</h3>
          <button
            onClick={() => navigate('/admin/add-resource')}
            className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            Add Resource
          </button>
        </div>

        {/* Add Practice Tests */}
        <div className="p-6 bg-white rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-blue-700">Practice Tests</h3>
          <button
            onClick={() => navigate('/admin/add-test')}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Add Practice Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;



