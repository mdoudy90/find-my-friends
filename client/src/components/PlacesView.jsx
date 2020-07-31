import React, { useState, useEffect } from 'react';
import { PLACES_API_KEY } from '../../../config.js';
import distance from '../helpers/distanceCalculator.js';
import FriendsView from './FriendsView.jsx';

const PlacesView = ({nearbyPlaces, coordinates, setPlaceOfInterest, setView, activeUserData, mood}) => {
  const [friendsDisplay, setFriendsDisplay] = useState();
  return (
    <div className = 'places-view-container'>
      <div className = 'places-view'>

        {!!nearbyPlaces && !!nearbyPlaces.length ? nearbyPlaces.map(({name, geometry, rating, vicinity, place_id, photos}) => {

          const distanceAway = distance(coordinates.lat, coordinates.lng, geometry.location.lat, geometry.location.lng).toFixed(2);

          const photoUrl = !!photos && !!photos.length ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photos[0].photo_reference}&key=${PLACES_API_KEY}` : null;

          return (
            <div className = 'place-row'>
              <div className = 'place-component'>
                <p className = 'place-distance'>{`${distanceAway} miles away`}</p>
                <p className = 'place-name'>{name}</p>
                <p className = 'place-address'>{vicinity}</p>
                {!!photoUrl && <img className = 'place-banner' src = {photoUrl}/>}
                <div className = 'place-component-footer'>
                  {!!rating ? <p className = 'place-rating'>{`Rating: ${rating}`}</p> : <p></p>}
                  <img src = './assets/map-icon.png' onClick={() => {
                    setPlaceOfInterest(place_id);
                    setView(1);
                  }}/>
                  <img src = './assets/invite-icon.png' onClick={() => {
                    friendsDisplay === place_id ? setFriendsDisplay() : setFriendsDisplay(place_id);
                  }
                  }/>
                </div>
                {friendsDisplay === place_id &&
                  <div>
                    <FriendsView
                      activeUserData = {activeUserData}
                      coordinates = {coordinates}
                      moodToFilter = {mood}
                    />
                  </div>
                }
              </div>
            </div>
          )
        }) : <p className = 'loading-text'>{`¯\_(ツ)_/¯`}</p>}

      </div>
    </div>
    );
};

export default PlacesView;
