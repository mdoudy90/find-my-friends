import React, { useState, useEffect } from 'react';
import distance from '../helpers/distanceCalculator.js';

const FriendsView = ({activeUserData, coordinates, moodToFilter}) => {

  return (
    <div className = {!moodToFilter ? 'friends-view-container' : 'friends-view-container-nested'}>
      <div className = 'friends-view'>
        {activeUserData.map((user) => {
          if (!moodToFilter || (!!moodToFilter && user.mood === moodToFilter)) {
            const distanceAway = distance(coordinates.lat, coordinates.lng, user.coordinates.lat, user.coordinates.lng).toFixed(2);
            return (
              <div className = 'friend-row'>
                <p>{user.name}</p>
                <p className = 'friend-distance'>{`${distanceAway} miles away`}</p>
                { user.mood === 'cafe' && <img src = './assets/coffee-icon.png'/> }
                { user.mood === 'night_club' && <img src = './assets/music-icon.png'/> }
                { user.mood === 'restaurant' && <img src = './assets/fork-icon.png'/> }
                { user.mood === 'bar' && <img src = './assets/cocktail-icon.png'/> }
                { user.mood === 'sleep' && <img src = './assets/sleep-icon.png'/> }
              </div>
          )}
        })}
      </div>
    </div>
    );
};

export default FriendsView;
