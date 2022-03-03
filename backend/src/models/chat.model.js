const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  users: {
    type: Array,
    required: true
  },
  messages: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model('User', chatSchema);