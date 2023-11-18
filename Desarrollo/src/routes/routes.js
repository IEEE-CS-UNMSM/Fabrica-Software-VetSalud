const express = require('express')
const path = require('path');
const router = express.Router();
const ClienteController = require('../controllers/cliente.controller');
const CitasController = require('../controllers/citas.controller');

router.get('/', (req, res) => {
    res.sendFile('./src/view/index.html');
  });

router.get('/obtener-usuarios', ClienteController.obtenerUsuarios);
router.get('/obtener-citas', CitasController.obtenerCitas);
module.exports = router;