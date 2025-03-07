import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import api from '../../services/api';
import ResourceCard from './ResourceCard';

//learnpage
const LearnPage = ({ subjectId }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/api/resources/${subjectId}`);
        setResources(res.data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [subjectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">
        Learn Resources for Subject {subjectId}
      </h1>

      {resources.length === 0 ? (
        <p className="text-gray-500">No resources found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map(resource => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LearnPage;
