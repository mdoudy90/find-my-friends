import React, { useState, useEffect } from 'react';

const BottomMenu = ({ setView }) => {

  return (
    <div className = 'bottom-menu'>
      <div onClick = {() => setView(1)} >
        <img src = './assets/home-icon.png'/>
      </div>
      <div onClick = {() => setView(2)} >
        <img src = './assets/coffee-icon.png'/>
      </div>
      <div onClick = {() => setView(3)} >
        <img src = './assets/users-icon.png'/>
      </div>
    </div>
    );
};

export default BottomMenu;
