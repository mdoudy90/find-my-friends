import React, { useState, useEffect } from 'react';
import distance from '../helpers/distanceCalculator.js';

const FriendsView = ({activeUserData, coordinates}) => {

  return (
    <div className = 'friends-view-container'>
      <div className = 'friends-view'>
        {activeUserData.map((user) => {
          const distanceAway = Math.round(distance(coordinates.lat, coordinates.lng, user.coordinates.lat, user.coordinates.lng));
          return (
            <div className = 'friend-row'>
              <p>{user.name}</p>
              <p>{`${distanceAway} miles away`}</p>
              <div>
                <p>Coffee?</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
    );
};

export default FriendsView;
