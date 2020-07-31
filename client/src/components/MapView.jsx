import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker.jsx';
import PlaceMarker from './PlaceMarker.jsx';
import { MAPS_API_KEY } from '../../../config.js';
// const MAPS_API_KEY = process.env.MAPS_API_KEY;

const MapView = ({name, coordinates, activeUserData, nearbyPlaces}) => {
  const [center, setCenter] = useState({
    lat: 40.8635,
    lng: -73.9225
  });
  const zoom = 15;

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '92vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: MAPS_API_KEY }}
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
        nearbyPlaces.map(({name, geometry}) => {
          return (
            <PlaceMarker
              lat={geometry.location.lat}
              lng={geometry.location.lng}
              text={name}
            />
            )
        })
        }

      </GoogleMapReact>
    </div>
  );
}

export default MapView;