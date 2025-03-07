import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

//test
const AddTest = () => {
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({ subjectId: '', title: '', questions: [] });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, message: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await api.get('/subjects/all');
      // console.log('Fetched Subjects:', res.data);
      setSubjects(res.data);
      setLoading(false);
    } catch (error) {
      // console.error('Error fetching subjects:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { questionText: '', options: ['', '', '', ''], correctAnswer: 0 }]
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];

    // Ensure questionText is always a string
    updatedQuestions[index][field] = field === 'questionText' ? String(value) : value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updatedQuestions = [...formData.questions];

    // Ensure options are always stored as strings
    updatedQuestions[qIndex].options[optIndex] = String(value);
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.subjectId) {
      setModal({ open: true, message: 'Please select a subject.', type: 'error' });
      return;
    }

    // Ensure all questions & options are strings before sending data
    const formattedData = {
      ...formData,
      questions: formData.questions.map(q => ({
        questionText: String(q.questionText),
        options: q.options.map(opt => String(opt)),
        correctAnswer: Number(q.correctAnswer) //  Ensure correctAnswer is a number
      }))
    };

    try {
      await api.post(`/practice/create/${formattedData.subjectId}`, formattedData);
      setModal({ open: true, message: 'Practice test added successfully!', type: 'success' });
      navigate('/admin/dashboard');
    } catch (error) {
      // console.error('Error adding practice test:', error.response?.data || error);
      setModal({ open: true, message: 'Failed to add practice test.', type: 'error' });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600">Add Practice Test</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {loading ? (
          <p>Loading subjects...</p>
        ) : (
          <>
            <label className="block text-gray-700 font-bold mb-2">Select Subject:</label>
            <select
              name="subjectId"
              onChange={handleChange}
              value={formData.subjectId}
              required
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Choose a Subject</option>
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name} (Grade {subject.gradeLevel})
                  </option>
                ))
              ) : (
                <option disabled>No subjects available</option>
              )}
            </select>
          </>
        )}

        <label className="block text-gray-700 font-bold mt-4">Test Title:</label>
        <input type="text" name="title" onChange={handleChange} required className="w-full border px-4 py-2 rounded" />

        <h3 className="text-lg font-semibold mt-6">Questions</h3>

        {formData.questions.map((question, qIndex) => (
          <div key={qIndex} className="mt-4 p-4 border rounded">
            <label className="block text-gray-700 font-bold">Question {qIndex + 1}:</label>
            <input
              type="text"
              value={question.questionText}
              onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
              required
              className="w-full border px-4 py-2 rounded"
              placeholder="Enter question"
            />

            <label className="block text-gray-700 font-bold mt-2">Options:</label>
            {question.options.map((option, optIndex) => (
              <input
                key={optIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                required
                className="w-full border px-4 py-2 rounded mt-1"
                placeholder={`Option ${optIndex + 1}`}
              />
            ))}

            <label className="block text-gray-700 font-bold mt-2">Correct Answer (Index 0-3):</label>
            <input
              type="number"
              min="0"
              max="3"
              value={question.correctAnswer}
              onChange={(e) => handleQuestionChange(qIndex, 'correctAnswer', Number(e.target.value))}
              required
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
          ➕ Add Question
        </button>

        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded w-full">
          Submit Test
        </button>
      </form>
    </div>
  );
};

export default AddTest;
