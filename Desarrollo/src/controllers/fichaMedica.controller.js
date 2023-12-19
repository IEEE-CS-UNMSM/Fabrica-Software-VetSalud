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
    FichaMedicaModel.obtenerDetallesFichaMedica(citaId, (error, datosFichaMedica) => {
      if (error) {
        return res.status(500).json({ error: 'Error al obtener datos de la ficha médica', details: error.message });
      }

      return res.json(datosFichaMedica);
    });
}

function guardarFichaMedica(req, res, datos) {
  console.log(datos)
    FichaMedicaModel.guardarFichaMedica(datos, (errorGuardar, resultado) => {
      if (errorGuardar) {
        return res.status(500).json({ error: 'Error al guardar la ficha médica', details: errorGuardar.message });
      }

      return res.json(resultado);
    });
}

module.exports = { obtenerFichasMedicas, obtenerDetallesFichaMedica, guardarFichaMedica };