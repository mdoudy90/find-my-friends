import React, { useState, useEffect } from 'react';

const PromptView = ({ setUserName, setUserMood, setView, toggleIsSharingData }) => {
  const [question, setQuestion] = useState(1);
  const [text, setText] = useState('');
  const [mood, setMood] = useState('');
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
                className={mood === 'cafe' ? 'selected' : null}
                src='./assets/coffee-icon.png'
                onClick={() => setMood('cafe')}
              />
              <img
                className={mood === 'restaurant' ? 'selected' : null}
                src='./assets/fork-icon.png'
                onClick={() => setMood('restaurant')}
              />
              <img
                className={mood === 'bar' ? 'selected' : null}
                src='./assets/cocktail-icon.png'
                onClick={() => setMood('bar')}
              />
              <img
                className={mood === 'night_club' ? 'selected' : null}
                src='./assets/music-icon.png'
                onClick={() => setMood('night_club')}
              />
              <img
                className={mood === 'sleep' ? 'selected' : null}
                src='./assets/sleep-icon.png'
                onClick={() => setMood('sleep')}
              />
            </div>
            <button
              onClick={() => {
                setQuestion(3);
              }}>
              Submit
            </button>
          </>
        )}
        {question === 3 && (
          <>
            <p className='prompt-consent'>Do you consent to share your live geolocation while using this app?</p>
            <button
              onClick={() => {
                toggleIsSharingData(true);
                mood ? setUserMood(mood) : setUserMood('sleep');
                setUserName(name);
                setView(1);
              }}>
              Yes
            </button>
            <button
              onClick={() => {
                mood ? setUserMood(mood) : setUserMood('sleep');
                setUserName(name);
                setView(1);
              }}>
              No
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PromptView;
