import React, { useState } from 'react';

const CarbonFootprintActivity = ({ onComplete }) => {
  const [activity, setActivity] = useState('energyConsumption');
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [droppedWords, setDroppedWords] = useState([]);
  const [answered, setAnswered] = useState(false);

  const activities = {
    carbonFootprint: {
      question: 'Select the image that corresponds to the carbon footprint of running a ChatGPT query:',
      images: [
        { src: 'path/to/image1.png', label: '1 gram CO2', correct: false, width: "auto" },
        { src: 'path/to/image2.png', label: '10 grams CO2', correct: true },
        { src: 'path/to/image3.png', label: '100 grams CO2', correct: false },
      ],
      correctFeedback: 'Correct! Running a ChatGPT query emits about 10 grams of CO2.',
      incorrectFeedback: 'Incorrect. Try again.',
    },
    energyConsumption: {
      question: 'Match the image to the estimated energy cost of training a single base A.I. model.',
      images: [
        { src: '/images/transAtlanticFlight.jpg', label: 'Trans Atlantic Flight', correct: true, width: "auto" },
        { src: '/images/kettle.webp', label: 'Boiling a kettle', correct: false },
        { src: '/images/netflix.jpg', label: 'Streaming on Netflix for five hours', correct: false },
      ],
      correctFeedback: 'Correct! In recent years AI’s contribution to digital carbon emissions has grown substantially, it has been estimated that the energy cost of training a single base A.I. model is equivalent to that of a trans-American flight (Strubell et al., 2020).',
      incorrectFeedback: 'Incorrect. In recent years AI’s contribution to digital carbon emissions has grown substantially, it has been estimated that the energy cost of training a single base A.I. model is equivalent to that of a trans-American flight (Strubell et al., 2020).',
    },
    storyCompletion: {
      question: 'Drag the words into the correct gaps to complete the story:',
      story: 'Data centres consume large amounts of electricity and account for over __ of global electricity, a __ of which comes from coal and natural gas.',
      words: [
        { word: '1%', correctIndex: 0 },
        { word: '1/3', correctIndex: 1 },
        { word: '10%'},
        {word: '3%'}
        
    
      ],
      correctFeedback: 'Correct! You have completed the story accurately.',
      incorrectFeedback: 'Incorrect. Try again.',
    },
  };

  const currentActivity = activities[activity];

  const handleNext = () => {
    if (activity === 'carbonFootprint' && selected !== null && currentActivity.images[selected].correct) {
      setActivity('energyConsumption');
      setSelected(null);
      setFeedback('');
      setAnswered(false);
    } else if (activity === 'energyConsumption') {
      setActivity('storyCompletion');
      setSelected(null);
      setFeedback('');
      setAnswered(false);
    } else if (activity === 'storyCompletion') {
      onComplete();
    }
  };

  const handleDragStart = (event, word) => {
    event.dataTransfer.setData('text/plain', word);
  };

  const handleDrop = (event, index) => {
    const word = event.dataTransfer.getData('text/plain');
    const newDroppedWords = [...droppedWords];
    newDroppedWords[index] = word;
    setDroppedWords(newDroppedWords);

    // Check if all gaps are filled
    if (newDroppedWords.every(w => w !== '')) {
      const allCorrect = currentActivity.words.every((w, i) => newDroppedWords[i] === w.word);
      console.log(allCorrect)
      if (allCorrect) {
        setFeedback(currentActivity.correctFeedback);
        setTimeout(() => handleNext(), 1000); // Move to the next activity after a short delay
      } else {
        
          if (newDroppedWords[0] === currentActivity.words[0].word) {
            setFeedback('Correct!');
          }
          else {
            setFeedback(currentActivity.incorrectFeedback);
          }
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleImageClick = (index) => {
    if (!answered) {
      setSelected(index);
      setAnswered(true);
      if (currentActivity.images[index].correct) {
        setFeedback(currentActivity.correctFeedback);
      } else {
        setFeedback(currentActivity.incorrectFeedback);
      }
    }
  };

  const renderActivity = () => {
    if (activity === 'carbonFootprint') {
      return (
        <div>
          <p>{currentActivity.question}</p>
          <div>
            {currentActivity.images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.label}
                onClick={() => handleImageClick(index)}
                style={{ border: selected === index ? '2px solid green' : '1px solid black', cursor: 'pointer' }}
              />
            ))}
          </div>
          <button className="button" onClick={handleNext}>Next</button>
          <p>{feedback}</p>
        </div>
      );
    } else if (activity === 'energyConsumption') {
      return (
        <div>
          <p>{currentActivity.question}</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', width: '100%' }}>
            {currentActivity.images.map((image, index) => (
              <div key={index} style={{ flex: '1 1 30%', margin: '10px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={image.src}
                  alt={image.label}
                  onClick={() => handleImageClick(index)}
                  style={{ border: selected === index ? '2px solid green' : '1px solid black', cursor: 'pointer', maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                />
              </div>
            ))}
          </div>
          <button className="button" onClick={handleNext}>Next</button>
          <p>{feedback}</p>
        </div>
      );
    } else if (activity === 'storyCompletion') {
      return (
        <div>
          <p>{currentActivity.question}</p>
          <p style={{ lineHeight: '2', wordBreak: 'break-word' }}>
            {currentActivity.story.split('__').map((part, index) => (
              <span key={index}>
                {part}
                {index < currentActivity.words.filter(word => word.correctIndex !== undefined).length && (
                  <span
                    onDrop={(event) => handleDrop(event, index)}
                    onDragOver={handleDragOver}
                    style={{ border: 'solid black', padding: '4px', margin: '0 3px' }}
                    data-index={index}
                  >
                    {droppedWords[index] || 'Drop here'}
                  </span>
                )}
              </span>
            ))}
          </p>
          <div>
            {currentActivity.words.map((word, index) => (
              <span
                key={index}
                draggable
                onDragStart={(event) => handleDragStart(event, word.word)}
                style={{ border: '1px solid black', padding: '5px', margin: '0 5px', cursor: 'grab' }}
              >
                {word.word}
              </span>
            ))}
          </div>
          <button className="button" onClick={handleNext}>Next</button>
          <p>{feedback}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <h2>
        {activity === 'carbonFootprint'
          ? 'Carbon Footprint Activity'
          : activity === 'energyConsumption'
          ? 'Energy Consumption Activity'
          : 'Story Completion Activity'}
      </h2>
      {renderActivity()}
    </div>
  );
};

export default CarbonFootprintActivity;