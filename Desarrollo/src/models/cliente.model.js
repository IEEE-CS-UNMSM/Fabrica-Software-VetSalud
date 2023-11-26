const { createConnection } = require('../database/database.js');
const bcrypt = require('bcrypt');


function obtenerUsuarios(callback) {
  const connection = createConnection();

  connection.connect((error) => {
    if (error) {
      return callback(error, null);
    }

    connection.query('SELECT * FROM vw_datoscliente', (err, results) => {
      connection.end();
      if (err) {
        return callback(err, null);
      }

      return callback(null, results);
    });
  });
}

function registrarUsuario(usuario, callback) {
    const connection = createConnection();

    // Hash de la contraseña antes de almacenarla en la base de datos
    bcrypt.hash(usuario.PASSWORD_USUARIO, 10, (hashError, hash) => {
        if (hashError) {
            return callback(hashError, null);
        }
        // Almacenar la contraseña hasheada en el objeto del usuario
        usuario.PASSWORD_USUARIO = hash;
        connection.connect((connectionError) => {
            if (connectionError) {
                return callback(connectionError, null);
            }
            connection.query('INSERT INTO TB_USUARIO SET ?', usuario, (err, results) => {
                connection.end();
                if (err) {
                    return callback(err, null);
                }
                return callback(null, results);
            });
        });
    });
}

module.exports = { obtenerUsuarios, registrarUsuario };