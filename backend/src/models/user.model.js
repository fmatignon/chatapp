const { TokenExpiredError } = require('jsonwebtoken');
const mongoose = require('mongoose');
require('mongoose-type-email');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  mail: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    unique: true
  },
  chats: {
    type: Array,
    default: []
  },
  contacts: {
    type: Array,
    default: []
  },
  token: {type: String}
});

module.exports = mongoose.model('User', UserSchema);