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
  const [prevCoordinates, setPrevCoordinates] = useState({lat: 0,lng: 0});
  const [nearbyPlaces, setNearbyPlaces] = useState();
  const [activeUserData, setActiveUserData] = useState();
  const [placeOfInterest, setPlaceOfInterest] = useState();

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

    // perform logic after a set distance traveled
    let x1 = coordinates.lat, y1 = coordinates.lng;
    let x2 = prevCoordinates.lat, y2 = prevCoordinates.lng;
    if ((x1 !== 0 && view === 2 && Math.sqrt(((x2 - x1) ** 2) + ((y2 - y1) ** 2)) > 0.003)) {

      setPrevCoordinates(coordinates);

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
    }

    return (
      axios.post('/liveusers/user', {
        name,
        coordinates,
        mood,
        active: false
      })
    )

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
          placeOfInterest={placeOfInterest}
        />}
      {view === 2 &&
        <PlacesView
          coordinates={coordinates}
          nearbyPlaces={nearbyPlaces}
          setPlaceOfInterest={setPlaceOfInterest}
          setView={setView}
          activeUserData={activeUserData}
          mood={mood}
        />}
      {view === 3 &&
        <FriendsView
          activeUserData = {activeUserData}
          coordinates = {coordinates}
          moodToFilter = {null}
        />}
        <BottomMenu setView = {setView}/>
      </>
      }
    </>
  );
};

export default App;
