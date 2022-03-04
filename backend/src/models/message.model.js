const mongoose = require('mongoose');
const User = require('../models/user.model');

const messageSchema = mongoose.Schema({
  user: {
    type: User,
    required: true
  },
  text:{
    type: String,
    required:true
  },
  dateCreation: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Message', messageSchema);