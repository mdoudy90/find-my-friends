const models = require('./models.js');

module.exports = {
  getLiveUsers: (req, res) => {
    models
      .dbGetLiveUsers(req.body)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },

  updateUser: (req, res) => {
    models
      .dbUpdateUser(req.body)
      .then((data) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  getPlaces: (req, res) => {
    models
      .apiGetPlaces(req.query)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  }
};
