import React, { useState, useEffect } from 'react';

const MapMarker = ({ text }) => {
  return <div style={{ height: '40px', width: '40px', backgroundColor: 'yellow', borderRadius: '30px' }}>{text}</div>;
};

export default MapMarker;
