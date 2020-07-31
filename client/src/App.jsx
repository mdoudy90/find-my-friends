import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PromptView from './components/PromptView.jsx';
import MapView from './components/MapView.jsx';
import PlacesView from './components/PlacesView.jsx';
import FriendsView from './components/FriendsView.jsx';
import BottomMenu from './components/BottomMenu.jsx';

const App = () => {
  const [name, setName] = useState();
  const [mood, setMood] = useState();
  const [view, setView] = useState(0);
  const [coordinates, setCoordinates] = useState({lat: 0,lng: 0});
  const [nearbyPlaces, setNearbyPlaces] = useState();
  const [activeUserData, setActiveUserData] = useState();

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
      setActiveUserData(data);
    })
  }, [name]);

  useEffect(() => {

    axios.post('/liveusers/user', {
      name,
      coordinates,
      mood,
      active: true
    });

    {!!mood && mood !== 'sleep' &&
      axios.get('/places', {
        params: {
          location: `${coordinates.lat}, ${coordinates.lng}`,
          rankby: 'distance',
          type: mood
      }}).then(({data}) => {
        setNearbyPlaces(data);
      })
  }

  }, [coordinates])

  useEffect(() => {
    const interval = setInterval(() => {
      axios.get('/liveusers/list', { name })
            .then(({data}) => {
              setActiveUserData(data);
            });
          }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getLocation();
    axios.get('/liveusers/list', { name })
    .then(({data}) => {
      setActiveUserData(data);
    })
  }, [name]);

  return (
    <>
      {view === 0 && <PromptView setUserName={setName} setUserMood={setMood} setView={setView}/>}
      { !!name &&
      <>
      {view === 1 &&
        <MapView
          name={name}
          coordinates={coordinates}
          activeUserData={activeUserData}
          nearbyPlaces={nearbyPlaces}
        />}
      {view === 2 &&
        <PlacesView
          coordinates={coordinates}
          nearbyPlaces={nearbyPlaces}
        />}
      {view === 3 &&
        <FriendsView
          activeUserData = {activeUserData}
          coordinates = {coordinates}
        />}
        <BottomMenu setView = {setView}/>
      </>
      }
    </>
  );
};

export default App;