import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import api from '../../services/api';
import QuestionCard from './QuestionCard';

const PracticeDetail = () => {
  const { testId } = useParams();
  const [testData, setTestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/practice/test/${testId}`);

        if (!res.data || !res.data.questions) {
          console.error("Invalid test data received:", res.data);
          setTestData(null);
        } else {
          setTestData(res.data);
          setAnswers(new Array(res.data.questions.length).fill(null));
        }
      } catch (error) {
        console.error('Error fetching test data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, [testId]);


  const handleOptionChange = (questionIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    try {
      // console.log("Submitting test for ID:", testId);
      // console.log("Answers:", answer);

      const res = await api.post(`/practice/submit/${testId}`, { answers });

      // console.log("Test submission successful. Response:", res.data);
      setScore(res.data.score);
    } catch (error) {
      console.error('Error submitting test:', error);

      if (error.response) {
        console.error("Server Response:", error.response.data);
      }

      alert("Failed to submit test. Please try again.");
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!testData) {
    return <p className="text-center text-gray-600 mt-4">Test not found.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">{testData.title}</h1>
      <p className="text-gray-700 mb-4">Subject: {testData.subject} | Grade: {testData.gradeLevel}</p>

      {testData.questions.length > 0 ? (
        testData.questions.map((question, idx) => (
          <QuestionCard
            key={idx}
            index={idx}
            question={question}
            selectedOption={answers[idx]}
            onChangeOption={handleOptionChange}
          />
        ))
      ) : (
        <p className="text-gray-600">No questions available.</p>
      )}

      {score === null ? (
        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      ) : (
        <div className="mt-6 p-4 bg-green-100 text-green-800 rounded">
          <p>
            Your score: <span className="font-semibold">{score}</span> /{' '}
            {testData.questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default PracticeDetail;
