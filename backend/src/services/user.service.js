const User = require('../models/user.model')

exports.getUsers = async function () {
  try {
    const user = await User.find({});
    return user;
  }
  catch {
    throw Error("Error while fetching user")
  }
};

exports.getUser = async function (query) {
  try {
    const user = await User.findOne(query);
    return user;
  }
  catch {
    throw Error("Error while fetching user")
  }
}

exports.register = async function (user) {
  try {
    let savedUser = await User.create(user);
    return savedUser;
  }
  catch(e) {
    console.log(e)
    throw Error("Error saving user")
  }
}