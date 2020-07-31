import React, { useState, useEffect } from 'react';
import { PLACES_API_KEY } from '../../../config.js';
import distance from '../helpers/distanceCalculator.js';

const PlacesView = ({nearbyPlaces, coordinates}) => {
  return (
    <div className = 'places-view-container'>
      <div className = 'places-view'>

{/* photos[0].photo_reference */}

        {!!nearbyPlaces && !!nearbyPlaces.length ? nearbyPlaces.map(({name, geometry, rating, vicinity, place_id, photos}) => {

          const distanceAway = distance(coordinates.lat, coordinates.lng, geometry.location.lat, geometry.location.lng).toFixed(2);

          const photoUrl = !!photos && !!photos.length ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photos[0].photo_reference}&key=${PLACES_API_KEY}` : null;

          return (
            <div className = 'place-row'>
              <div className = 'place-component'>
                <p className = 'place-distance'>{`${distanceAway} miles away`}</p>
                <p className = 'place-name'>{name}</p>
                <p className = 'place-address'>{vicinity}</p>
                {!!photoUrl && <img lassName = 'place-banner' src = {photoUrl}/>}
                <div className = 'place-component-footer'>
                  <p className = 'place-rating'>{`Rating: ${rating}`}</p>
                  <img src = './assets/map-icon.png'/>
                  <img src = './assets/invite-icon.png'/>
                </div>
              </div>
            </div>
          )
        }) : <p className = 'loading-text'>{`¯\_(ツ)_/¯`}</p>}

      </div>
    </div>
    );
};

export default PlacesView;
