// authMiddleware.js

const jwt = require("jsonwebtoken");

const validarToken = (req, res, next) => {
  let token = false;
  // Obtener el token del encabezado de la solicitud
  if (req.headers.authorization !== undefined) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Verificar si el token está presente
  if (!token) {
    return res
      .status(401)
      .json({ message: "No se proporcionó un token de autenticación" });
  }
  // Verificar la validez del token
  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ message: "Token de autenticación inválido" });
    } else {
      // Si el token es válido, puedes acceder a los datos del usuario decodificados en decoded.userId
      req.userId = decoded.userId;
      next();
    }
  });
};

module.exports = validarToken;
