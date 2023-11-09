const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

// Cargar variables de entorno a process.env
dotenv.config();

// Crear la instancia de sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: false,
    },
  }
);

module.exports = {
  sequelize,
};