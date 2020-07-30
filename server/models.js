const queries = require('../database/queries.js');
const apiHelpers = require('./helpers/apiHelpers.js');

module.exports = {
  dbGetLiveUsers: (data) => queries.getAllUsers(data),
  dbUpdateUser: (data) => queries.updateUserData(data),
  apiGetPlaces: (data) => apiHelpers.getPlaces(data),
};
