/**
 * La función registra la dirección y el puerto en el que escucha el servidor.
 * 
 * :param server: El parámetro `server` es el objeto de servidor que se crea utilizando el método
 * `http.createServer()`. Representa el servidor HTTP que escucha las solicitudes entrantes
 */
function onListening(server) {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}

module.exports = {
  onListening,
};
