const { User } = require('./index.js');

module.exports = {
  getAllUsers: (data) => User.find({active: true, name: { $ne: data.name }}).exec(),
  updateUserData: (data) => {
    if (!data.name) {
      return User.findOneAndUpdate({ name: data.name }, {...data, active: false}, { upsert: true });
    } else {
      return User.findOneAndUpdate({ name: data.name }, data, { upsert: true });
    }
  },
};
