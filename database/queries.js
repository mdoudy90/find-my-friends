const { User } = require('./index.js');

module.exports = {
  getAllUsers: (data) => User.find({active: true, name: { $ne: data.name }}).exec(),
  updateUserData: (data) => User.findOneAndUpdate({ name: data.name }, data, { upsert: true }),
};
