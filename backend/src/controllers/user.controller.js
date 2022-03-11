const userService = require('../services/user.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getUsers = async function(req, res) {
  // Setear parámetros por defecto del request.
  //var page = req.params.page ? req.params.page : 1;
  //var limit = req.params.limit ? req.params.limit : 10;
  // Pasar la call al service
  // console.log(jwt.verify(req.headers['access-token'],process.env.TOKEN_KEY))
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch(err) {
    res.status(500).send(err);
  }
};

exports.register = async function (req, res) {
  try {
    // Registrar el input del usario
    // Validar que haya puesto todo
    console.log(req.body)
    const { username, password, mail } = req.body;
    if (!(mail && password && username)) {
      return res.status(400).send("All input is required");
    };

    // Validar que no exista en la base de datos
    const oldUser = await userService.getUser({ mail });
    if (oldUser) {
      return res.status(409).send("User Already Exists. Please Login");
    }

    // Encriptar la contraseña
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await userService.register({
      username,
      password,
      mail: mail.toLowerCase(),
      password: encryptedPassword
    })

    // Crear jwt y guardarlo en el user
    const token = jwt.sign(
      { user_id: user._id, mail },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;

    // Devolver el usuario creado.
    res.status(201).json(user);
    }
  catch (err) {
    console.log(err);
  }}

  exports.login = async (req, res) => {
    const currentUser = await userService.getUser({username: req.body.username})
    const token = jwt.sign(
        { user_id: req.body.username},
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
    if((currentUser != null)&&( bcrypt.compareSync(req.body.password, currentUser.password))){
      try {res.json(token)} 
      catch(err) {res.json({message: err})}}
    else res.status(403).send({message:"wrong password or username"})
  }
