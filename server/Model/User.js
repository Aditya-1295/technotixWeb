const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    userName: { type: String },
    userPass: { type: String },
    userEmail: { type: String },
    userCollege: { type: String }
  });

module.exports = mongoose.model('User', userSchema);
