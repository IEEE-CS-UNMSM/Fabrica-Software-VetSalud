const FichaMedicaModel = require('../models/fichaMedica.model');
const path = require('path');

function obtenerFichasMedicas(req, res) {
  FichaMedicaModel.obtenerFichasMedicas((error, ficha) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener las fichas médicas' });
    } else {
      ficha.forEach(ficha => {
        const fecha = ficha.Fecha; 
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const anio = fecha.getFullYear();
        const fechaFormateada = `${dia}/${mes}/${anio}`;

        ficha.Fecha = fechaFormateada;
      });
      res.render(path.join(__dirname, '..','view', 'tablist'), { ficha } );
    }
  });
}


function obtenerDetallesFichaMedica(req, res) {
  const { citaId } = req.query;

  if (!citaId) {
    return res.status(400).json({ error: 'ID de cita no proporcionado.' });
  }

  CitaModel.verificarRegistroCita(citaId, (errorCita, existeCita) => {
    if (errorCita) {
      return res.status(500).json({ error: 'Error al verificar el registro de la cita', details: errorCita.message });
    }

    if (!existeCita) {
      return res.status(404).json({ error: 'No se encontró un registro de cita para el ID proporcionado.' });
    }

    // Si hay un registro de cita, procede a obtener detalles de la ficha médica
    FichaMedicaModel.obtenerDetallesFichaMedica(citaId, (error, datosFichaMedica) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener datos de la ficha médica', details: error.message });
      }

      return res.json(datosFichaMedica);
    });
  });
}

function guardarFichaMedica(req, res) {
  const { citaId, chequeoGeneral, diagnostico, tratamiento } = req.body;

  if (!citaId || !chequeoGeneral || !diagnostico || !tratamiento) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Verifica primero si hay un registro de cita antes de guardar la ficha médica
  CitaModel.verificarRegistroCita(citaId, (errorCita, existeCita) => {
    if (errorCita) {
      return res.status(500).json({ error: 'Error al verificar el registro de la cita', details: errorCita.message });
    }

    if (!existeCita) {
      return res.status(404).json({ error: 'No se encontró un registro de cita para el ID proporcionado.' });
    }

    // Si hay un registro de cita, procede a guardar la ficha médica
    FichaMedicaModel.guardarFichaMedica({ citaId, chequeoGeneral, diagnostico, tratamiento }, (errorGuardar, resultado) => {
      if (errorGuardar) {
        return res.status(500).json({ error: 'Error al guardar la ficha médica', details: errorGuardar.message });
      }

      return res.json(resultado);
    });
  });
}

module.exports = { obtenerFichasMedicas, obtenerDetallesFichaMedica, guardarFichaMedica };