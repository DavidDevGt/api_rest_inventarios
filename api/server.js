// Importar librerías para la API
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const dotenv = require('dotenv');

// Cargar variables de entorno a process.env
dotenv.config();

// Importar los routers
const authRoutes = require('./routes/authRoutes');
// Falta importar los routers de los otros módulos

// Cargar sequelize
const  { sequelize } = require('./config/dbConfig');