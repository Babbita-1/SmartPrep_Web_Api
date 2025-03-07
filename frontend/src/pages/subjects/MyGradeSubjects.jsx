import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const MyGradeSubjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/subjects/all');
        setSubjects(res.data); // Should be a flat array if users is not admin
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-5xl p-4">
      <h1 className="text-2xl font-bold mb-4">My Subjects</h1>
      <ul className="list-disc ml-4 space-y-2">
        {subjects.map((subject) => (
          <li key={subject._id}>
            {subject.name} (Grade {subject.gradeLevel})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyGradeSubjects;


