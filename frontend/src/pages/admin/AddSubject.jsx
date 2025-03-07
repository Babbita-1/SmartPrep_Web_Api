import React, { useState } from 'react';
import Modal from '../../components/Modal';
import api from '../../services/api';

const AddSubject = () => {
  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [modal, setModal] = useState({ open: false, message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/subjects', { name, gradeLevel: Number(gradeLevel) });
      setModal({ open: true, message: 'Subject added successfully!', type: 'success' });

      setTimeout(() => setModal({ open: false }), 1000); // Auto-close after 2 seconds
    } catch (error) {
      setModal({ open: true, message: 'Error adding subject', type: 'error' });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow mt-8">
      <h1 className="text-2xl font-bold mb-4">Add New Subject</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          <span className="text-gray-700">Subject Name</span>
          <input
            type="text"
            className="mt-1 block w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label className="block mb-2">
          <span className="text-gray-700">Grade Level</span>
          <input
            type="number"
            className="mt-1 block w-full border rounded p-2"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            required
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Subject
        </button>
      </form>

      {modal.open && <Modal message={modal.message} type={modal.type} onClose={() => setModal({ open: false })} />}
    </div>
  );
};

export default AddSubject;
