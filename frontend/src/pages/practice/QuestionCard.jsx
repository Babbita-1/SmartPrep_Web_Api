import React from 'react';

const QuestionCard = ({ index, question, selectedOption, onChangeOption }) => {
  const { questionText, options } = question;

  return (
    <div className="mb-4 bg-white shadow p-4 rounded">
      <h2 className="font-semibold mb-2">
        {index + 1}. {questionText}
      </h2>
      <ul className="space-y-2">
        {options.map((option, optIndex) => (
          <li key={optIndex}>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${index}`}
                checked={selectedOption === optIndex}
                onChange={() => onChangeOption(index, optIndex)}
              />
              <span>{option}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
