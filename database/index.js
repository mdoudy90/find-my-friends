const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/findMyFriends', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, unique: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    },
    active: Boolean,
  },
  { timestamps: true },
);

module.exports = {
  User: mongoose.model('User', userSchema),
};
