const MascotaModel = require('../models/mascota.model');

function obtenerMascotas(req, res) {
    MascotaModel.obtenerMascotas((error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener mascotas' });
        } else {
            res.json(results);
        }
    });
}

function obtenerDetallesMascota(req, res) {
    const { id } = req.query;
  
    if (!id) {
      return res.status(400).json({ error: 'ID no proporcionado.' });
    }
  
    MascotaModel.obtenerDetallesMascota(id, (error, datosMascota) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener datos de las mascotas', details: error.message });
      }
  
      return res.json(datosMascota);
    });
  }

module.exports = { obtenerMascotas, obtenerDetallesMascota };
