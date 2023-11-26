const Cliente = require('../models/cliente.model');
const fs = require('fs');
const { createConnection } = require('../database/database.js');
const bcrypt = require('bcrypt');


function obtenerUsuarios(req, res) {
  Cliente.obtenerUsuarios((error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json(results);
    }
  });
}

function registrarUsuario(usuario, callback) {
  Cliente.registrarUsuario(usuario, (error, resultado) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, resultado);
    }
  });
}

function obtenerUsuarioPorCorreo(correo, callback) {
  const connection = createConnection();

  connection.connect((error) => {
      if (error) {
          return callback(error, null);
      }

      connection.query('SELECT * FROM TB_USUARIO WHERE EMAIL_USUARIO = ?', [correo], (err, results) => {
          connection.end();
          if (err) {
              return callback(err, null);
          }

          if (results.length === 0) {
              return callback(null, null); // Usuario no encontrado
          }

          const usuario = results[0];
          return callback(null, usuario);
      });
  });
}

function obtenerUsuarioPorId(usuarioId, callback) {
  const connection = createConnection();

  connection.connect((error) => {
      if (error) {
          return callback(error, null);
      }

      connection.query('SELECT * FROM TB_USUARIO WHERE ID_USUARIO = ?', [usuarioId], (err, results) => {
          connection.end();
          if (err) {
              return callback(err, null);
          }

          if (results.length === 0) {
              return callback(null, null); // Usuario no encontrado
          }

          const usuario = results[0];
          return callback(null, usuario);
      });
  });
}

function registrarMascota(usuarioId, nombre, tipo, raza, sexo, fecha, foto, evidencia, callback) {
  const connection = createConnection();

  const mascota = {
    ID_USUARIO: usuarioId,
    NOMBRE_MASCOTA: nombre,
    ESPECIE_MASCOTA: tipo,
    RAZA_MASCOTA: raza,
    SEXO_MASCOTA: sexo,
    FECHA_NACIMIENTO_MASCOTA: fecha,
    IMAGEN_MASCOTA: fs.readFileSync(foto), // Lee el archivo de la foto
    EVIDENCIA_MASCOTA: fs.readFileSync(evidencia), // Lee el archivo de la evidencia
  };

  connection.connect((connectionError) => {
    if (connectionError) {
      return callback(connectionError, null);
    }

    connection.query('INSERT INTO TB_MASCOTAS SET ?', mascota, (err, results) => {
      connection.end();
      if (err) {
        return callback(err, null);
      }

      return callback(null, results);
    });
  });
}

function obtenerMascotasPorUsuario(usuarioId, callback) {
  const connection = createConnection();

  connection.connect((error) => {
    if (error) {
      return callback(error, null);
    }

    connection.query('SELECT * FROM TB_MASCOTAS WHERE ID_USUARIO = ?', [usuarioId], (err, results) => {
      connection.end();
      if (err) {
        return callback(err, null);
      }

      return callback(null, results);
    });
  });
}


module.exports = { obtenerUsuarios, registrarUsuario, obtenerUsuarioPorCorreo, obtenerUsuarioPorId, registrarMascota, obtenerMascotasPorUsuario };