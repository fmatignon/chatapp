const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const User = require('../models/user.model');


router.get('/', (req, res) => {
  res.send('from the router');
});

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    mail: req.body.mail
  });
  const savedUser = await user.save();
  try {
    res.json(savedUser);
  } catch(err) {
    res.json({message: err});
  }
});

module.exports = router;