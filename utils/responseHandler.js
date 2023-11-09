/**
 * La función "success" envía una respuesta exitosa con los datos proporcionados y el código de estado.
 * 
 * :param res: El parámetro `res` es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Por lo general, lo proporciona el marco web o la biblioteca que está utilizando
 * :param data: El parámetro "datos" son los datos de respuesta que desea enviar al cliente. Puede ser
 * cualquier objeto o valor de JavaScript que desee incluir en el cuerpo de la respuesta
 * :param code: El parámetro "código" es un parámetro opcional que representa el código de estado HTTP
 * que se enviará en la respuesta. Si no se proporciona, el valor predeterminado es 200 (OK), defaults
 * to 200 (optional)
 */
function sucess(res, data, code = 200) {
  res.status(code).json({
    error: false,
    status: code,
    body: data,
  });
}

/**
 * La función "failure" envía una respuesta JSON con un mensaje de error y un código de estado al
 * cliente.
 * 
 * :param res: El parámetro "res" es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Normalmente lo proporciona el marco web o la biblioteca que se utiliza
 * :param message: El parámetro de mensaje es una cadena que representa el mensaje de error que se
 * devolverá en el cuerpo de la respuesta
 * :param code: El parámetro "código" es un parámetro opcional que representa el código de estado HTTP
 * que se enviará en la respuesta. Si no se proporciona, el valor predeterminado es 500 (Error interno
 * del servidor), defaults to 500 (optional)
 */
function failure(res, message, code = 500) {
  res.status(code).json({
    error: true,
    status: code,
    body: message,
  });
}

/**
 * La función `notFound` es una función auxiliar en JavaScript que envía una respuesta JSON con un
 * código de estado 404 y un mensaje de error predeterminado de "No encontrado".
 * 
 * :param res: El parámetro `res` es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Normalmente es una instancia de la clase `http.ServerResponse` en Node.js o un objeto
 * equivalente en otros marcos o bibliotecas
 * :param message: El parámetro "mensaje" es un parámetro opcional que representa el mensaje de error
 * que se devolverá en el cuerpo de la respuesta. Si no se proporciona ningún "mensaje", se utilizará
 * el valor predeterminado "No encontrado", defaults to Not Found (optional)
 */
function notFound(res, message = "Not Found") {
  res.status(404).json({
    error: true,
    status: 404,
    body: message,
  });
}

/**
 * La función `badRequest` es una función auxiliar en JavaScript que envía una respuesta JSON con un
 * código de estado 400, un mensaje de error y datos opcionales.
 * 
 * :param res: El parámetro `res` es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Normalmente lo proporciona el marco web o la biblioteca que se utiliza
 * :param message: El parámetro `message` es una cadena que representa el mensaje de error que se
 * enviará en la respuesta. Es opcional y tiene un valor predeterminado de "Solicitud incorrecta" si no
 * se proporciona, defaults to Bad Request (optional)
 * :param data: El parámetro "datos" es un parámetro opcional que representa cualquier dato adicional
 * que desee incluir en el cuerpo de la respuesta. Es un objeto que puede contener cualquier par
 * clave-valor que desee enviar al cliente (optional)
 */
function badRequest(res, message = "Bad Request", data = {}) {
    res.status(400).json({
        error: true,
        status: 400,
        message: message,
        body: data,
    });
} 

/**
 * La función "unauthorized" envía una respuesta JSON con un código de estado 401 y un mensaje de
 * error que indica acceso no autorizado.
 * 
 * :param res: El parámetro `res` es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Normalmente es una instancia de la clase `http.ServerResponse` en Node.js o un objeto
 * equivalente en otros marcos
 * :param message: El parámetro `message` es un parámetro opcional que representa el mensaje de error
 * que se enviará en la respuesta. Si no se proporciona ningún mensaje, se utilizará el mensaje
 * predeterminado "No autorizado", defaults to Unauthorized (optional)
 */
function unauthorized(res, message = "Unauthorized") {
    res.status(401).json({
        error: true,
        status: 401,
        message: message,
    });
}

/**
 * La función "forbidden" envía una respuesta 403 Prohibido con un mensaje de error opcional.
 * 
 * :param res: El parámetro `res` es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Normalmente es una instancia de la clase `http.ServerResponse` en Node.js o un objeto
 * equivalente en otros marcos
 * :param message: El parámetro "mensaje" es un parámetro opcional que representa el mensaje de error
 * que se incluirá en la respuesta. Si no se proporciona ningún "mensaje", el valor predeterminado se
 * establece en "Prohibido", defaults to Forbidden (optional)
 */
function forbidden(res, message = "Forbidden") {
    res.status(403).json({
        error: true,
        status: 403,
        message: message,
    });
}

/**
 * La función "conflict" es una función auxiliar en JavaScript que envía una respuesta de conflicto
 * 409 con un mensaje de error y datos opcionales.
 * 
 * :param res: El parámetro `res` es el objeto de respuesta que se utiliza para enviar la respuesta al
 * cliente. Suele ser una instancia de la clase `Response` en un marco web como Express.js
 * :param message: El parámetro de mensaje es una cadena que representa el mensaje de error que se
 * devolverá en la respuesta. Es opcional y tiene un valor predeterminado de "Conflicto" si no se
 * proporciona, defaults to Conflict (optional)
 * :param data: El parámetro "datos" es un parámetro opcional que representa cualquier dato adicional
 * que desee incluir en el cuerpo de la respuesta. Es un objeto que puede contener cualquier par
 * clave-valor que desee enviar al cliente (optional)
 */
function conflict(res, message = "Conflict", data = {}) {
    res.status(409).json({
        error: true,
        status: 409,
        message: message,
        body: data,
    });
}

/**
 * La función "created" se utiliza para enviar una respuesta exitosa con datos y un código de estado de
 * 201.
 * 
 * :param res: El parámetro "res" se utiliza normalmente para representar el objeto de respuesta en una
 * aplicación web. Se utiliza para enviar la respuesta al cliente
 * :param data: El parámetro "datos" son los datos que se enviarán como respuesta al cliente. Puede ser
 * cualquier tipo de datos, como un objeto, una matriz o una cadena
 */
function created(res, data) {
    sucess(res, data, 201);
}

/**
 * La función "noContent" envía una respuesta con un código de estado de 204, indicando que no hay
 * contenido para enviar.
 * 
 * :param res: El parámetro `res` es un objeto que representa la respuesta HTTP que se enviará al
 * cliente
 */
function noContent(res) {
    res.status(204).send();
}

module.exports = {
    success,
    failure,
    notFound,
    badRequest,
    unauthorized,
    forbidden,
    conflict,
    created,
    noContent,
  };