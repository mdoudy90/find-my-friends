import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import MapMarker from './MapMarker.jsx';
// import { API_KEY } from '../../../config.js';
// const API_KEY = process.env.API_KEY;

const MapView = ({name}) => {
  const [center, setCenter] = useState({
    lat: 40.8635,
    lng: -73.9225
  });
  const zoom = 15;
  const [coordinates, setCoordinates] = useState({lat: 0,lng: 0});
  const [activeUserCoordinates, setActiveUserCoordinates] = useState();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      });
    } else {
      console.log("Geolocation is not supported.");
    }
  }

  useEffect(() => {
    getLocation();
    axios.get('/liveusers/list', { name })
    .then(({data}) => {
      setActiveUserCoordinates(data);
    })
  }, [name]);

  useEffect(() => {
    let data = {name, coordinates, active: true};
    axios.post('/liveusers/user', data);
  }, [coordinates])

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('/liveusers/list', { name })
            .then(({data}) => {
              console.log(data);
              setActiveUserCoordinates(data);
            });
          }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {/* Map through all online users */}
        {!!coordinates &&
        <MapMarker
          lat={coordinates.lat}
          lng={coordinates.lng}
          text={name}
        />}

        {!!activeUserCoordinates &&
        activeUserCoordinates.map(({name, coordinates}) => {
          return (
          <MapMarker
            lat={coordinates.lat}
            lng={coordinates.lng}
            text={name}
          />
          )
        })}

      </GoogleMapReact>
    </div>
  );
}

export default MapView;