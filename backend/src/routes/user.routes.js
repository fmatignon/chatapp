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

// Crear nuevo usuario
// TODO: Hashear contraseña.
router.post('/signup', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    mail: req.body.mail
  });
  console.log(await checkMail(req.body.mail))
  if(await checkMail(req.body.mail)){
    const savedUser = await user.save();
    try {
      res.json(savedUser);
    } catch(err) {
      res.json({message: err});
    }
  }
  else res.status(409).send({message:"Mail alredy exist"})
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
// TODO: agregar JWT. Comprobar contraseña hasheada.
router.post('/login', async (req, res) => {
  const currentUser = await User.findOne({username: req.body.username}).exec()
  if((currentUser != null)&&(req.body.password == currentUser.password)) try {res.json(currentUser)} catch(err) {res.json({message: err})}
  else res.status(403).send({message:"wrong password or username"})
})

router.post('/delete', async (req, res) => {
  console.log(req.body)
  var cosito = await User.findOneAndDelete({mail:req.body.mail}).exec();
  try {
    res.json({message:"User with mail "+req.body.mail+" was deleted"});
  } catch(err) {
    res.json({message: err});
  }
})



// Cambiar por el que sea el identificador primario
async function checkMail(currentMail){
  return await User.findOne({mail:currentMail}).exec() == null
}

module.exports = router;