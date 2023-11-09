class CustomError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const errors = {
  badRequest: {
    status: 400,
    message:
      "La solicitud es incorrecta o está mal formada. Verifique los datos enviados e intente nuevamente.",
  },
  unauthorized: {
    status: 401,
    message:
      "No autorizado. Debe autenticarse para obtener la respuesta solicitada.",
  },
  paymentRequired: {
    status: 402,
    message:
      "Pago requerido. La solicitud no se puede procesar hasta que se realice el pago.",
  },
  forbidden: {
    status: 403,
    message:
      "Prohibido. No tiene los permisos necesarios para acceder a este recurso.",
  },
  notFound: {
    status: 404,
    message: "El recurso solicitado no fue encontrado.",
  },
  methodNotAllowed: {
    status: 405,
    message:
      "Método no permitido. No se puede utilizar este método para la solicitud realizada.",
  },
  notAcceptable: {
    status: 406,
    message:
      "No aceptable. El servidor no puede generar un contenido acorde a los Accept headers enviados en la petición.",
  },
  proxyAuthenticationRequired: {
    status: 407,
    message:
      "Se requiere autenticación de proxy para continuar con la solicitud.",
  },
  requestTimeout: {
    status: 408,
    message:
      "Tiempo de espera de la solicitud agotado. El servidor cerró la conexión por inactividad.",
  },
  conflict: {
    status: 409,
    message:
      "Conflicto. La solicitud no se pudo procesar debido a un conflicto con el estado actual del recurso.",
  },
  gone: {
    status: 410,
    message:
      "Gone. El recurso solicitado ya no está disponible y no lo estará en el futuro.",
  },
  lengthRequired: {
    status: 411,
    message:
      "Longitud requerida. La solicitud no especificó la longitud de su contenido, que es requerida por el recurso solicitado.",
  },
  preconditionFailed: {
    status: 412,
    message:
      "Precondición fallida. Una o más condiciones dadas en los headers de la solicitud fallaron al evaluarse en el servidor.",
  },
  payloadTooLarge: {
    status: 413,
    message:
      "Carga útil demasiado grande. La solicitud es mayor de lo que el servidor está dispuesto o puede procesar.",
  },
  unsupportedMediaType: {
    status: 415,
    message:
      "Tipo de medio no soportado. La solicitud tiene un formato que no es soportado por el recurso solicitado.",
  },
  rangeNotSatisfiable: {
    status: 416,
    message:
      "Rango no satisfactorio. El cliente ha solicitado una porción del archivo, pero el servidor no puede suministrar esa parte.",
  },
  expectationFailed: {
    status: 417,
    message:
      "Expectativa fallida. El servidor no puede cumplir con los requerimientos del campo Expect de la cabecera de la solicitud.",
  },
  teapot: {
    status: 418,
    message:
      "Soy una tetera. La solicitud fue dirigida a una tetera y no puede hacer café.",
  },
  misdirectedRequest: {
    status: 421,
    message:
      "Solicitud mal dirigida. La solicitud fue dirigida a un servidor que no es capaz de producir una respuesta.",
  },
  unprocessableEntity: {
    status: 422,
    message:
      "Entidad no procesable. La solicitud está bien formada, pero no se pudo seguir debido a errores semánticos.",
  },
  locked: {
    status: 423,
    message: "Bloqueado. El recurso al que se está accediendo está bloqueado.",
  },
  failedDependency: {
    status: 424,
    message:
      "Dependencia fallida. La solicitud falló debido a una falla en una solicitud previa.",
  },
  tooEarly: {
    status: 425,
    message:
      "Demasiado temprano. La solicitud puede ser repetida, pero podría ser rechazada por precaución.",
  },
  upgradeRequired: {
    status: 426,
    message:
      "Se requiere actualización. El cliente debería cambiar a un protocolo diferente tal como se indica en el campo Upgrade de la cabecera.",
  },
  preconditionRequired: {
    status: 428,
    message:
      "Precondición requerida. El servidor requiere que la solicitud del navegador sea condicional.",
  },
  tooManyRequests: {
    status: 429,
    message:
      "Demasiadas solicitudes. El usuario ha enviado demasiadas solicitudes en un período de tiempo dado.",
  },
  requestHeaderFieldsTooLarge: {
    status: 431,
    message:
      "Campos de cabecera de solicitud demasiado grandes. El servidor no está dispuesto a procesar la solicitud porque uno o más campos de cabecera son demasiado grandes.",
  },
  unavailableForLegalReasons: {
    status: 451,
    message:
      "No disponible por razones legales. El contenido ha sido retirado como consecuencia de una orden judicial o demanda relacionada con derechos de autor.",
  },
  internalServerError: {
    status: 500,
    message:
      "Error interno del servidor. Ocurrió un error inesperado y el servidor no puede completar la solicitud.",
  },
  notImplemented: {
    status: 501,
    message:
      "No implementado. El servidor no soporta una funcionalidad necesaria para responder a la solicitud.",
  },
  badGateway: {
    status: 502,
    message:
      "Mal gateway. El servidor estaba actuando como un gateway o proxy y recibió una respuesta inválida del servidor ascendente.",
  },
  serviceUnavailable: {
    status: 503,
    message:
      "Servicio no disponible. El servidor no está listo para manejar la solicitud, usualmente porque está sobrecargado o en mantenimiento.",
  },
  gatewayTimeout: {
    status: 504,
    message:
      "Tiempo de espera del gateway agotado. El servidor estaba actuando como un gateway o proxy y no recibió una respuesta a tiempo del servidor ascendente.",
  },
  httpVersionNotSupported: {
    status: 505,
    message:
      "Versión HTTP no soportada. La versión de HTTP utilizada en la solicitud no es soportada por el servidor.",
  },
  // Puedes continuar añadiendo más errores según lo necesites...
};

function responseHandler(res, data, status = 200) {
  res.status(status).json({
    error: false,
    status: status,
    body: data,
  });
}

function errorHandler(res, error) {
  let errorResponse = {
    error: true,
    status: error.status || 500,
    message: error.message || errors.internalServerError.message,
  };

  res.status(errorResponse.status).json(errorResponse);
}

module.exports = {
  responseHandler,
  errorHandler,
  CustomError,
  errors,
};
