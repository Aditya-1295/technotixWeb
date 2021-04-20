const mongoose = require('mongoose');

  const eventSchema = new mongoose.Schema({
    eventName: { type: String },
    eventDate: { type: String },
    eventDescription: { type: String },
    image: { type: String }
  });

module.exports = mongoose.model('Event', eventSchema);
