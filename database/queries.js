const { User } = require('./index.js');

module.exports = {
  getAllUsers: () => User.find({active: true}).exec(),
  updateUserData: (data) => User.findOneAndUpdate({ name: data.name }, data, { upsert: true }),
};
