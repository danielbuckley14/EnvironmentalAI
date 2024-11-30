import React, { useState } from 'react';

const questions = [
  // {
  //   question: "What is the carbon footprint of training a large language model?",
  //   options: ["1 ton CO2", "10 tons CO2", "100 tons CO2"],
  //   answer: 1,
  //   explanation: "Training a large language model can emit as much as 10 tons of CO2, which is equivalent to the carbon footprint of five cars over their lifetimes."
  // },
  // {
  //   question: "How much energy does a data center consume annually?",
  //   options: ["1 TWh", "10 TWh", "100 TWh"],
  //   answer: 2,
  //   explanation: "Data centers worldwide consume about 100 TWh of energy annually, which is roughly equivalent to the annual energy consumption of a small country."
  // },
  {
    question: "The training of AI models is heavily reliant on energy-intensive data centres, which not only consume electricity but also require the aid of cooling systems. For each gigabyte of data generated from a data center how many litres of water are required for cooling?",
    options: ["205 L", "10 L", "100 L"],
    answer: 0,
    explanation: "For each gigabyte of data generated from a data center, approximately 10 liters of water are required for cooling (Ristic et al., 2015). "
  }
];

const Quiz = ({ onComplete }) => {
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Incorrect. The correct answer is "${questions[currentQuestion].options[questions[currentQuestion].answer]}". ${questions[currentQuestion].explanation}`);
    }
    setShowFeedback(true);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setShowFeedback(false);
      setFeedback('');
    } else {
      onComplete(score);
    }
  };

  return (
    <div>
            

      <h2>Quiz</h2>
      <p>Question {currentQuestion+1}</p>
      <div style={{height: "20px"}}></div>

      <p style={{}}>{questions[currentQuestion].question}</p>
      <div style={{height: "50px"}}></div>

      {questions[currentQuestion].options.map((option, index) => (
        <button className='button-green' key={index} onClick={() => handleAnswer(index)} disabled={showFeedback}>
          {option}
        </button>
      ))}
      {showFeedback && (
        <div>
          <p>{feedback}</p>
          <button className='button-green' onClick={handleNext}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;