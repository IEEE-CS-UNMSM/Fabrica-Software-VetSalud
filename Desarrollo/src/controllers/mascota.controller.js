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

module.exports = { obtenerMascotas };
