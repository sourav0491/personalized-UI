const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true},
  pwd: { type: String},
  social: {
    google: {
      id: String,
      token: String,
      name: String,
      email: String,
      photo: String
    }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;