const express = require("express");
const cors = require("cors");
const Services = require("./Services/TaskServices");

const Task = express.Router();

//  Configuración de express.
Task.use(express.urlencoded({ extended: true }));
Task.use(express.json());
Task.use(cors());

//  Ruta de agregar tareas
Task.post("/agregar", async (req, res) => {

  console.log(req.body);
  let { nombre, estado_de_entrega, calificacion } = req.body;
  const { status, response } = await Services.agregar(nombre, estado_de_entrega, calificacion);
  res.status(status).json(response);

});

// Ruta de eliminar tareas
Task.delete("/eliminar", async (req, res) => {

  console.log(req.body);
  let {nombre} = req.body;
  const { status, response } = await Services.eliminar(nombre);
  res.status(status).json(response);

});


// Ruta de actualizar tareas
Task.put("/actualizar", async (req, res) => {

  console.log(req.body);
  let {nombre, estado_de_entrega, calificacion} = req.body;
  const { status, response } = await Services.actualizar(nombre, estado_de_entrega, calificacion);
  res.status(status).json(response);

});


module.exports = Task;


