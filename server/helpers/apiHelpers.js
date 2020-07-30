const axios = require('axios');
const { PLACES_API_KEY } = require('../../config.js');
const API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

module.exports = {
  getPlaces: (data) => {
    return axios
      .get(API, {
        params: {
          location: data.location,
          rankby: data.rankby || 'distance',
          type: data.type,
          key: PLACES_API_KEY,
          opennow: true,
        },
      })
      .then(({ data }) => {
        return data.results;
      });
  },
};
