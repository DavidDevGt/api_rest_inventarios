const app = require('./api/server');
const { sequelize } = require('./api/config/dbConfig');
const { onListening } = require('./utils/serverUtils');

sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      onListening(server);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar con la base de datos: " + err);
  });
