const mongoose = require('mongoose');

const projectSchema = {
    projectName: {type: String},
    projectLink: {type: String},
    projectDescription: {type: String},
    image: {type: String}
  }
  
  module.exports = mongoose.model('Project', projectSchema);
