const express = require("express");
const cors = require("cors");
const Dal = require("./UserDal");
const services = require("./Services/UserServices");
const Middleware = require("../Middleware/Middleware");

const User = express.Router();

User.use(express.urlencoded({ extended: true }));
User.use(express.json());
User.use(cors());

User.get("/all", async (req, res) => {

  try {
    const result = await Dal.query("SELECT id_alumno, correo FROM alumno");
    res.status(200).json({
      message: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error,
    });
  }

});

//Rgistrar usuario 
User.post("/sign-up", async (req, res) => {

  let { nombre, correo, contraseña, no_tareas } = req.body;
  const { status, response } = await services.signUp(nombre, correo, contraseña, no_tareas);
  res.status(status).json(response);

});

//Iniciar sesión de usuario
User.post("/login", async (req, res) => {

  console.log(req.body);
  let { correo, contraseña } = req.body;
  const { status, response } = await services.login(correo, contraseña);
  res.status(status).json(response);

});

//ruta secreta
User.post("/ruta", Middleware, (req, res) => {

  res.status(200).json({

    message: "Hola :v",
    data: req.jwData,

  })

});


module.exports = User;