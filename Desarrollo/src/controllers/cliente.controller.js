const ClienteModel = require('../models/cliente.model');

function obtenerClientes(req, res) {
  ClienteModel.obtenerClientes((error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json(results);
    }
  });
}

function obtenerDetallesCliente(req, res) {
  const { dni } = req.query;

  if (!dni) {
    return res.status(400).json({ error: 'DNI no proporcionado.' });
  }

  ClienteModel.obtenerDetallesCliente(dni, (error, datosCliente) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener datos del cliente', details: error.message });
    }

    return res.json(datosCliente);
  });
}

module.exports = { obtenerDetallesCliente, obtenerClientes };
