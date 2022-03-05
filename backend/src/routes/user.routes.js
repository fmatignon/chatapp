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
 
router.put('/', async (req, res) => {
  const savedUser = await User.findOneAndUpdate({_id: req.body._id}, req.body);
  try {
    res.json(savedUser);
  } catch(err) {
    res.json({message: err});
  }
});

// iniciar sesión, falta hashear la contraseńa
router.post('/login', async (req, res) => {
  const currentUser = await User.findOne({username: req.body.username}).exec()
  if((currentUser != null)&&(req.body.password == currentUser.password)){
    try {
      res.json(currentUser);
    } catch(err) {
      res.json({message: err});
  }}
  else{
      res.json({message:"wrong password or username"})
  }

})

module.exports = router;