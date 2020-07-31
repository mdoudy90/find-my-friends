const mongoose = require('mongoose');
const host = process.env.MONGODB_URI || 'mongodb://localhost'

mongoose.connect(`${host}`);

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, unique: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    },
    mood: String,
    active: Boolean,
  },
  { timestamps: true },
);

module.exports = {
  User: mongoose.model('User', userSchema),
};
