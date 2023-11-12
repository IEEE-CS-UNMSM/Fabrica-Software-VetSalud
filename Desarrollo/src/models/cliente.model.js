const { createConnection } = require('../database/database.js');

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

module.exports = { obtenerUsuarios };
