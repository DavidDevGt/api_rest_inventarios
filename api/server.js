// Importar librerías para la API
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const dotenv = require("dotenv");

// Cargar variables de entorno a process.env
dotenv.config();

// Importar los routers
const authRoutes = require("./routes/authRoutes");
// Falta importar los routers de los otros módulos

// Cargar sequelize
const { sequelize } = require("./config/dbConfig");

// Cargar mis funciones de ayuda
const { onListening } = require("./utils/serverUtils");
const {
  responseHandler,
  errorHandler,
  errors,
} = require("./utils/responseHandler");

const app = express();

// Middlewares
app.use(helmet()); // Para las cabeceras HTTP
app.use(compression()); // Para comprimir las respuestas
app.use(cors()); // Para permitir las peticiones desde varios origenes
app.use(express.json()); // Para parsear JSON
app.use(express.urlencoded({ extended: true })); // Para parsear los datos de los formularios

// Rutas
app.use("/auth", authRoutes);
// Falta agregar las rutas de los otros módulos...

app.get("/", (req, res) => {
  responseHandler(res, {
    message: "El server está correctamente configurado.",
  });
});

// Ruta para manejar errores 404
app.use((req, res, next) => {
  errorHandler(res, errors.notFound);
});

// Manejo global de errores
app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    errorHandler(res, err);
  } else {
    errorHandler(
      res,
      new CustomError(errors.internalServerError.status, err.message)
    );
  }
});

// Exportamos la aplicación
module.exports = app;
