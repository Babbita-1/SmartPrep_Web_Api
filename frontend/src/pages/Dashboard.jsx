import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import api from '../services/api';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!auth) {
      navigate('/sign-in'); // Redirect if not logged In
    } else {
      fetchUserSubjects();
    }
  }, [auth, navigate]);

  const fetchUserSubjects = async () => {
    try {
      const res = await api.get(`/subjects/grade/${auth.academicLevel}`);
      setSubjects(res.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching subjects');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">Welcome, {auth?.name}!</h1>
      <p className="text-gray-700 text-center mb-6">
        {auth.role === 'admin'
          ? 'Manage subjects, resources, and practice tests.'
          : 'Here are your available subjects and resources:'}
      </p>

      {loading && <p className="text-center text-gray-500">Loading subjects...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Admin Controls */}
      {auth.role === 'admin' && (
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => navigate('/admin/add-subject')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ➕ Add Subject
          </button>
          <button
            onClick={() => navigate('/admin/add-resource')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            📚 Add Resource
          </button>
          <button
            onClick={() => navigate('/admin/add-test')}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            📝 Add Practice Test
          </button>
        </div>
      )}

      {/* Subjects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div key={subject._id} className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700">{subject.name}</h3>
            <p className="text-gray-600">Grade Level: {subject.gradeLevel}</p>

            {/* Learning Resources */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-800">Resources:</h4>
              {subject.resources.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {subject.resources.map((resource) => (
                    <li key={resource._id} className="text-blue-500 hover:underline">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.title} ({resource.type})
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No resources available.</p>
              )}
            </div>

            {/* Buttons for Additional Actions */}
            <div className="mt-4">
              <button
                onClick={() => navigate(`/subjects/${subject._id}/tests`)}
                className="ml-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Take Practice Tests
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
