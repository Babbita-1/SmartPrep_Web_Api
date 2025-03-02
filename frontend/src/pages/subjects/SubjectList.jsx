import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../App';

const SubjectList = ({ allSubjects }) => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        let endpoint;
        
        if (!auth) {
          // Not logged in users  See all available subjects
          endpoint = '/subjects/all';
        } else if (auth.role === 'admin') {
          // Admin  See all subjects
          endpoint = '/subjects/all';
        } else {
          // Student  See only their grade-level subjects
          endpoint = `/subjects/grade/${auth.academicLevel}`;
        }

        const response = await api.get(endpoint);
        setSubjects(response.data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [auth]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-blue-700">Available Subjects</h2>
      <p className="text-center text-gray-600 mb-6">
        {!auth
          ? 'Browse all subjects. Sign in to access learning and practice tests.'
          : auth.role === 'admin'
          ? 'Here are all subjects available for management.'
          : 'Here are the subjects available for your grade level.'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <div key={subject._id} className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-blue-700">{subject.name}</h3>
            <p className="text-gray-600">Grade Level: {subject.gradeLevel}</p>

            {/* Buttons */}
            <div className="mt-4 space-x-4">
              <button
                onClick={() => (auth ? navigate(`/subjects/${subject._id}`) : navigate('/sign-in'))}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Learn
              </button>
              <button
                onClick={() => (auth ? navigate(`/subjects/${subject._id}/tests`) : navigate('/sign-in'))}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Practice
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
