// controllers/cliente.controller.js
const UserModel = require('../models/cliente.model');

function obtenerUsuarios(req, res) {
  UserModel.obtenerUsuarios((error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json(results);
    }
  });
}

module.exports = { obtenerUsuarios };
