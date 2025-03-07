import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { AuthContext } from '../../App';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const PracticeList = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tests, setTests] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      // Redirect non-authenticated users to Sign In
      navigate('/sign-in');
      return;
    }

    const fetchTests = async () => {
      try {
        let endpoint;
        
        if (auth?.role === 'admin') {
          endpoint = '/practice/all'; // Admin gets all tests
        } else {
          endpoint = `/practice/grade/${auth.academicLevel}`; // Students get only their grade tests
        }

        const response = await api.get(endpoint);
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [auth, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-blue-700 text-center">Practice Tests</h1>

      {Object.keys(tests).length === 0 ? (
        <p className="text-gray-500 text-center">No practice tests available.</p>
      ) : (
        Object.keys(tests).map(grade => (
          <div key={grade} className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Grade {grade}</h2>
            
            {Object.keys(tests[grade]).map(subject => (
              <div key={subject} className="mt-4">
                <h3 className="text-xl font-semibold text-gray-700">{subject}</h3>
                <ul className="mt-2 space-y-2">
                  {tests[grade][subject].map(test => (
                    <li key={test._id} className="bg-white shadow rounded p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{test.title}</span>
                        <button
                          onClick={() => navigate(`/practice/test/${test._id}`)}
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Start Test
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default PracticeList;
