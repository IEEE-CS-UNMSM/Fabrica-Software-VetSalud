const { createConnection } = require('../database/database.js');

function obtenerCitas(callback) {
  const connection = createConnection();

  connection.connect((error) => {
    if (error) {
      return callback(error, null);
    }

    connection.query('SELECT * FROM vw_detallesconsulta', (err, results) => {
      connection.end();
      if (err) {
        return callback(err, null);
      }

      return callback(null, results);
    });
  });
}

module.exports = { obtenerCitas };
