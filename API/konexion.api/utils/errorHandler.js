// errorHandler.js

const handleCorsError = (err, req, res, next) => {
  if (err && err.message === "Not allowed by CORS") {
    // Si el error es causado por CORS, responder con un mensaje adecuado
    res.status(403).json({ error: "Not allowed by CORS" });
  } else {
    // De lo contrario, pasa el error al siguiente middleware de manejo de errores
    next(err);
  }
};

module.exports = handleCorsError;