import React from 'react';

const Introduction = ({ onStart }) => {
  return (
    
    <div style={{display: 'flex', flexDirection: "column", alignItems: "center"}}>
      <div style={{height: "100px"}}></div>
      <h1>Welcome to my game, AI and the Environment</h1>
      <p>This game consists of a series of activities to help you learn about the environmental impacts of large language models and AI.</p>
      <div style={{height: "80px"}}></div>
      <button className='button-green' onClick={onStart}>Start</button>
    </div>
  );
};

export default Introduction;