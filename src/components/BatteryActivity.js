import React, { useState } from 'react';

const BatteryActivity = ({ onComplete }) => {
  const [charge, setCharge] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleChargeChange = (event) => {
    setCharge(event.target.value);
  };

  const handleSubmit = () => {
    if (charge >= 35 && charge <= 40) { 
      setFeedback('Correct! Creating Five images using AI requires about 38% of an iPhone battery charge (Luccioni et al., 2024).');
      setTimeout(onComplete, 4000); // Proceed to the next stage after 2 seconds
    } else {
      setFeedback('Incorrect. Creating Five images using AI requires about 38% of an iPhone battery charge (Luccioni et al., 2024)');
      setTimeout(onComplete, 4000);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>How much IPhone charge would be equivelent to the energy required to create five images using AI?</h2>
      <div style={{width: "50px", border: '2px solid black', height: '10px', margin:' auto', borderRadius: '4px 4px 0px 0px' , borderBottom: '0px'}}></div>
      <div style={{ position: 'relative', width: '200px', height: '400px', border: '2px solid black', margin: '0 auto', borderRadius: "4px" }}>
        <div style={{ position: 'absolute', bottom: 0, width: '100%', height: `${charge}%`, backgroundColor: '#00b359' }}></div>
        <div style={{ position: 'absolute', bottom: 0, width: "100%", height: `${charge}%`}}> {charge}% </div>

      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={charge}
        onChange={handleChargeChange}
        style={{ width: '200px', margin: '20px 0' }}
      />
      <button className="button" onClick={handleSubmit}>Submit</button>
      <p>{feedback}</p>
    </div>
  );
};

export default BatteryActivity;