import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AddResource = () => {
  const [formData, setFormData] = useState({ subjectId: '', title: '', type: '', url: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/api/resources/${formData.subjectId}`, formData);
      alert('Resource added successfully!');
      navigate('/dashboard');
    } catch (error) {
      alert('Failed to add resource.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="subjectId" placeholder="Subject ID" onChange={handleChange} required />
      <input name="title" placeholder="Title" onChange={handleChange} required />
      <input name="url" placeholder="Resource URL" onChange={handleChange} required />
      <select name="type" onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="video">Video</option>
        <option value="document">Document</option>
        <option value="link">Link</option>
      </select>
      <button type="submit">Add Resource</button>
    </form>
  );
};

export default AddResource;
//adds