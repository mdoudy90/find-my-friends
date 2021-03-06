import React, { useState, useEffect } from 'react';

const PlaceMarker = ({ text, isPlaceOfInterest }) => {
  const [highlighted, toggleHighlighted] = useState(false);

  return (
    <div className='place-marker'>
      <div
        className={isPlaceOfInterest ? 'placeOfInterest-marker-icon' : 'place-marker-icon'}
        onClick={() => toggleHighlighted(!highlighted)}></div>
      <p style={highlighted || isPlaceOfInterest ? { display: 'inline' } : { display: 'none' }}>{text}</p>
    </div>
  );
};

export default PlaceMarker;
