const axios = require('axios');
const { hash } = require('../../config.js');
const API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

module.exports = {
  getPlaces: (data) => {
    return axios
      .get(API, {
        params: {
          location: data.location,
          rankby: data.rankby || 'distance',
          type: data.type,
          key: hash,
          opennow: true,
        },
      })
      .then(({ data }) => {
        return data.results;
      });
  },
};
