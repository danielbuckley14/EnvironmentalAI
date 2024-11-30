import React, { useState } from 'react';
import Introduction from './Introduction';
import Quiz from './Quiz';
import CarbonFootprintActivity from './CarbonFootprintActivity';
import BatteryActivity from './BatteryActivity'; // Import the new component

const Game = () => {
  const [stage, setStage] = useState('introduction');
  const [progress, setProgress] = useState(0);
  const [quizKey, setQuizKey] = useState(0);

  const handleStart = () => {
    setStage('quiz');
    setProgress(25);
  };

  const handleQuizComplete = () => {
    setStage('carbonFootprint');
    setProgress(50);
  };

  const handleCarbonFootprintComplete = () => {
    setStage('batteryActivity'); // Transition to the new battery activity stage
    setProgress(75);
  };

  const handleBatteryActivityComplete = () => {
    setStage('completed');
    setProgress(100);
  };

  const handleBeginAgain = () => {
    setStage('introduction');
    setProgress(0);
    setQuizKey(quizKey + 1); // Change the key to reset the Quiz component
  };

  return (
    <div>
      <div style={{ width: '100%', backgroundColor: '#ccc' }}>
        <div style={{ width: `${progress}%`, height: '10px', backgroundColor: '#4caf50' }}></div>
      </div>
      {stage === 'introduction' && <Introduction onStart={handleStart} />}
      {stage === 'quiz' && <Quiz key={quizKey} onComplete={handleQuizComplete} />}
      {stage === 'carbonFootprint' && <CarbonFootprintActivity onComplete={handleCarbonFootprintComplete} />}
      {stage === 'batteryActivity' && <BatteryActivity onComplete={handleBatteryActivityComplete} />} {/* Add the new stage */}
      {stage === 'completed' && (
        <div>
          <h2>Congratulations! You've completed the game.</h2>
          <button className="button" onClick={handleBeginAgain}>Begin Again</button>
        </div>
      )}
    </div>
  );
};

export default Game;