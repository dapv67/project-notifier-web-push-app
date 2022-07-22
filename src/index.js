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

app.listen(3000);
console.log("Server listening...");
