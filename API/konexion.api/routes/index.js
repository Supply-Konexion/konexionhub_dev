const express = require('express');
const router = express.Router();

// Definir una ruta para la página de inicio
router.get('/', (req, res) => {
    res.send('Active services ...');
});

// Exportar el enrutador
module.exports = router;