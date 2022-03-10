const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user.controller');
const User = require('../models/user.model');


router.get('/', userController.getUsers);


router.get('/protected', async(req, res) => {
  console.log(req.headers['access-token'])
  try{
    // asi se verifica al usuario que mandó la petición
    console.log(jwt.verify(req.headers['access-token'],process.env.TOKEN_KEY))
    const users = await User.find();
    res.send(users);
  }catch(err){
    res.status(500).send(err);
  }
});

// Crear nuevo usuario
router.post('/register', userController.register)

router.put('/', async (req, res) => {
  const savedUser = await User.findOneAndUpdate({_id: req.body._id}, req.body);
  try { res.json(savedUser);} 
  catch(err) { res.json({message: err});}
});

router.post('/login', userController.login)

router.post('/delete', async (req, res) => {
  await User.findOneAndDelete({mail:req.body.mail}).exec();
  try {res.json({message:"User with mail "+req.body.mail+" was deleted"});} 
  catch(err) {res.json({message: err});}
})


module.exports = router;