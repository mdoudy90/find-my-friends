import React, { Component, useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const MapView = () => {
  const [center, setCenter] = useState({
    lat: 40.8635,
    lng: -73.9225
  });
  const [coordinates, setCoordinates] = useState();
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
        bootstrapURLKeys={{ key: 'AIzaSyCH9x22A06oNfvta-FUnQi2KJQrMIOzXdw' }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* Map through all online users */}
        <AnyReactComponent
          lat={coordinates.lat}
          lng={coordinates.lng}
          text='Michael D'
        />

      </GoogleMapReact>
    </div>
  );
}

export default MapView;