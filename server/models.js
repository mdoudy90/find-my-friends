const queries = require('../database/queries.js');

module.exports = {
  dbGetLiveUsers: (data) => queries.getAllUsers(data),
  dbUpdateUser: (data) => queries.updateUserData(data),
};
