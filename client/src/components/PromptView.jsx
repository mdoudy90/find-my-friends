import React, { useState, useEffect } from 'react';

const PromptView = ({ setUserName, setUserMood, setView }) => {
  const [question, setQuestion] = useState(1);
  const [text, setText] = useState('');
  const [mood, setMood] = useState('antisocial');
  const [name, setName] = useState('Anonymous');

  return (
    <div className='prompt-view-container'>
      <div className='prompt-view'>
        {question === 1 && (
          <>
            <p>What's your name?</p>
            <input type='text' value={text} onChange={(e) => setText(e.target.value)}></input>
            <button
              onClick={() => {
                !!text.length ? setName(text) : null;
                setQuestion(2);
              }}>
              Submit
            </button>
          </>
        )}
        {question === 2 && (
          <>
            <p>What are you in the mood for?</p>
            <div className='mood-choices'>
              <img
                className={mood === 'coffee' ? 'selected' : null}
                src='./assets/coffee-icon.png'
                onClick={() => setMood('coffee')}
              />
              <img
                className={mood === 'food' ? 'selected' : null}
                src='./assets/fork-icon.png'
                onClick={() => setMood('food')}
              />
              <img
                className={mood === 'drinks' ? 'selected' : null}
                src='./assets/cocktail-icon.png'
                onClick={() => setMood('drinks')}
              />
              <img
                className={mood === 'dancing' ? 'selected' : null}
                src='./assets/music-icon.png'
                onClick={() => setMood('dancing')}
              />
              <img
                className={mood === 'sleep' ? 'selected' : null}
                src='./assets/sleep-icon.png'
                onClick={() => setMood('sleep')}
              />
            </div>
            <button
              onClick={() => {
                setUserName(name);
                setUserMood(mood);
                setView(1);
              }}>
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PromptView;
