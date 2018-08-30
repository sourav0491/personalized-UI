const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true , required:true},
  pwd: { type: String, required:true}, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;