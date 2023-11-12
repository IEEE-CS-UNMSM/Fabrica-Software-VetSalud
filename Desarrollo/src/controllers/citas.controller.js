const CitasModel = require('../models/citas.model');

function obtenerCitas(req, res) {
  CitasModel.obtenerCitas((error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener citas' });
    } else {
      res.json(results);
    }
  });
}

module.exports = { obtenerCitas };
