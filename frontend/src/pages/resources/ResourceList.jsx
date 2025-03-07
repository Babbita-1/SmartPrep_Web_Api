import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import { FaBook, FaVideo, FaExternalLinkAlt } from 'react-icons/fa';

const ResourceList = () => {
  const { subjectId } = useParams();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get(`/resources/${subjectId}`);
        setResources(response.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
        setError('Failed to load resources.');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [subjectId]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Learning Resources</h2>

      {loading && <p className="text-center text-gray-500">Loading resources...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="bg-white shadow-lg rounded-lg p-6">
        {resources.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {resources.map((resource) => (
              <li key={resource._id} className="flex items-center gap-4 py-3">
                {/* Icon based on resource type */}
                <span className="text-2xl text-blue-600">
                  {resource.type === 'video' ? <FaVideo /> : resource.type === 'document' ? <FaBook /> : <FaExternalLinkAlt />}
                </span>

                {/* Resource Title & Link */}
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-200 flex-1"
                >
                  {resource.title}
                </a>

                {/* Resource Type */}
                <span className="text-sm bg-gray-200 px-2 py-1 rounded-md">{resource.type}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No resources available.</p>
        )}
      </div>
    </div>
  );
};

export default ResourceList;
