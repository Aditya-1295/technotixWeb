const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    memberName: {type: String},
    memberPost: {type: String},
    memberCommittee: {type: String},
    year: {type: String},
    image: {type: String}
});

module.exports = mongoose.model('Member', memberSchema);
