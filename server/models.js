const queries = require('../database/queries.js');

module.exports = {
  dbGetLiveUsers: () => queries.getAllUsers(),
  dbUpdateUser: (data) => queries.updateUserData(data)
}