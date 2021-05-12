require("dotenv").config();
const express = require("express");
const cors = require("cors");
const User = require("./components/User/User");
const Task = require("./components/Task/Task");

const app = express();

app.use( express.urlencoded({
	extended:true
}));

app.use(express.json());
app.use(cors());


app.use("/usuarios", User.api);
app.use("/tareas", Task.api);

app.listen(3000, () => {

	console.clear();
	console.log("Task corriendo en el puerto 3000");
	//console.log(process.env);

});




