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

function registrarCita(usuarioId, mascotaId, fecha, motivo, callback) {
  const cita = {
    ID_MASCOTA: mascotaId,
    FECHA_HORA_CITA: fecha,
    MOTIVO_CITA: motivo,
  };

  CitasModel.registrarCita(cita, (error, resultado) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, resultado);
    }
  });
}

module.exports = { obtenerCitas, registrarCita };