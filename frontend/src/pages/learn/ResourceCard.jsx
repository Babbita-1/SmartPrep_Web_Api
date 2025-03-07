import React from 'react';

const ResourceCard = ({ resource }) => {
  const { title, type, url } = resource;

  return (
    <div className="bg-white shadow-md rounded p-4 hover:shadow-lg transition-shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 capitalize">Type: {type}</p>
      <div className="mt-4">
        {type === 'video' ? (

          <iframe
            title={title}
            src={url}
            className="w-full h-40"
            allowFullScreen
          />
        ) : (
          <a
            href={url}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Resource
          </a>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
