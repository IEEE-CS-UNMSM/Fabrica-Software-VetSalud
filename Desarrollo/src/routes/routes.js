const express = require('express')
const path = require('path');
const router = express.Router();
const ClienteController = require('../controllers/cliente.controller');
const CitasController = require('../controllers/citas.controller');
const MascotaController = require('../controllers/mascota.controller');


router.get('/', (req, res) => {
    res.sendFile('./src/view/index.html');
  });

router.get('/obtener-usuarios', ClienteController.obtenerClientes);
router.get('/obtener-detalle', ClienteController.obtenerDetallesCliente);
router.get('/obtener-citas', CitasController.obtenerCitas);
router.get('/obtener-mascotas', MascotaController.obtenerMascotas);
router.get('/obtener-detalle-mascotas', MascotaController.obtenerDetallesMascota);

router.get("*",(req, res)=>{
  const filePath = path.join(__dirname, '../view/e404.html');
  res.sendFile(filePath);
});
module.exports = router;