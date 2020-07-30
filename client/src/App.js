import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapView from './components/MapView.jsx';

const App = () => {
  const [name, setName] = useState();

  useEffect(() => {
    let namePrompt = prompt('Please enter your name:') || 'anonymous';
    setName(namePrompt);
  }, []);

  return (
    <>
      { !!name && <MapView name={name} />}
    </>
  );
};

export default App;
