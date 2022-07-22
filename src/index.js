require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

//Middlewares
app.use(morgan("dev"));
//Con estas 2 lineas sig el sistema es capaz de entender la información que llega por petecion al servidor
app.use(express.urlencoded({ extended: false })); //Para entender un formulario
app.use(express.json()); //Convertir los datos de peticciones http a format json

//Routes
app.use(require("./routes/index"));

//Static Content
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000; //Variable de entorno: Variable que del entorno donde se esta ejecutando el codigo
app.listen(3000, function () {
  console.log("Servidor escuchando en el puerto", PORT);
});
// console.log("Server listening...");
