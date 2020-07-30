import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker.jsx';
import { API_KEY } from '../../../config.js';

const MapView = () => {
  const [center, setCenter] = useState({
    lat: 40.8635,
    lng: -73.9225
  });
  const [coordinates, setCoordinates] = useState({lat: 0,lng: 0});
  const zoom = 15;

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) =>
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      );
    } else {
      console.log("Geolocation is not supported.");
    }
  }

  useEffect(() => {
    getLocation();
  }, [1]);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* Map through all online users */}
        {!!coordinates &&
        <MapMarker
          lat={coordinates.lat}
          lng={coordinates.lng}
          text='Michael D'
        />}

      </GoogleMapReact>
    </div>
  );
}

export default MapView;