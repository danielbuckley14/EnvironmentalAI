import React from 'react';

const InteractiveActivity = ({ onComplete }) => {
  return (
    <div>
      <h2>Interactive Activity</h2>
      <p>Simulate the energy consumption of AI models.</p>
      <button className='button-green' onClick={onComplete}>Complete Activity</button>
    </div>
  );
};

export default InteractiveActivity;