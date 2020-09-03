import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker.jsx';
import PlaceMarker from './PlaceMarker.jsx';
// import { MAPS_API_KEY } from '../../../config.js';
const MAPS_API_KEY = process.env.REACT_APP_API_KEY;

const MapView = ({name, coordinates, activeUserData, nearbyPlaces, placeOfInterest}) => {
  const [center, setCenter] = useState({
    lat: 40.8635,
    lng: -73.9225
  });
  const zoom = 15;

  return (

    // Important! Always set the container height explicitly
    <div style={{ height: '92vh', width: '100%' }}>
      {console.log('HERE: ', process.env.NODE_ENV)}
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {!!coordinates &&
        <MapMarker
          lat={coordinates.lat}
          lng={coordinates.lng}
          text={name}
        />}

        {!!activeUserData &&
        activeUserData.map(({name, coordinates}) => {
          return (
          <MapMarker
            lat={coordinates.lat}
            lng={coordinates.lng}
            text={name}
          />
          )
        })}

        {!!nearbyPlaces &&
        nearbyPlaces.map(({name, geometry, place_id}) => {
          let isPlaceOfInterest = false;
          if (placeOfInterest === place_id) {
            isPlaceOfInterest = true;
          }

          return (
            <PlaceMarker
              lat={geometry.location.lat}
              lng={geometry.location.lng}
              text={name}
              isPlaceOfInterest={isPlaceOfInterest}
            />
            )
        })
        }

      </GoogleMapReact>
    </div>
  );
}

export default MapView;