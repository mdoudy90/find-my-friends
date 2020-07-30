import React, { useState, useEffect } from 'react';

const MapMarker = ({ text }) => {
  return <div className = 'user-marker'>
      <div className = 'user-marker-icon'></div>
      <p>{text}</p>
    </div>;
};

export default MapMarker;
