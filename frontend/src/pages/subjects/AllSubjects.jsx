import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const AllSubjects = () => {
  const [groupedSubjects, setGroupedSubjects] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const res = await api.get('/subjects/all');
        // The response could be either an array of grouped data if admin
        // or a flat array if user is a student
        if (Array.isArray(res.data) && res.data[0]?._id !== undefined && res.data[0].subjects) {
          
          setIsAdmin(true);
          setGroupedSubjects(res.data);
        } else {
          
          setIsAdmin(false);
          
          setGroupedSubjects([{ _id: 'Your Grade', subjects: res.data }]);
        }
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
      <h1 className="text-2xl font-bold mb-4">Subjects</h1>

      {/* If the user is admin, shows all grades. Otherwise, just shows single group. */}
      {groupedSubjects.map((group) => (
        <div key={group._id} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            {isAdmin ? `Grade: ${group._id}` : 'Your Grade'}
          </h2>
          <ul className="list-disc ml-4 space-y-1">
            {group.subjects.map((subject) => (
              <li key={subject._id}>
                {subject.name} (Grade {subject.gradeLevel})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AllSubjects;
