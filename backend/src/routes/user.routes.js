const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const User = require('../models/user.model');


router.get('/', async(req, res) => {
  try{
    const users = await User.find();
    res.send(users);
  }catch(err){
    res.status(500).send(err);
  }
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

//hay que chequear que ande
router.put('/', async (req, res) => {
  const savedUser = await User.findOneAndUpdate({_id: req.body._id}, req.body);
  try {
    res.json(savedUser);
  } catch(err) {
    res.json({message: err});
  }
});

module.exports = router;