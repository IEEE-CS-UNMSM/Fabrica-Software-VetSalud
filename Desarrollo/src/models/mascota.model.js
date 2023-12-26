const { createConnection } = require('../database/database.js');

function obtenerMascotas(callback) {
    const connection = createConnection();

    connection.connect((error) => {
        if (error) {
            return callback(error, null);
        }

        connection.query('SELECT ID_MASCOTA, NOMBRE_MASCOTA FROM TB_MASCOTAS', (err, results) => {
            connection.end();
            if (err) {
                return callback(err, null);
            }

            return callback(null, results);
        });
    });
}

function obtenerDetallesMascota (idCliente, callback) {
    const connection = createConnection();
  
    connection.connect((error) => {
      if (error) {
        return callback(error, null);
      }
      const query = `
        SELECT * FROM tb_mascotas WHERE ID_USUARIO = ?;`;
        connection.query(query, [idCliente], (err, results) => {
          connection.end();
  
          if (err) {
            return callback(err, null);
          }
  
          if (results.length === 0) {
            return callback(null, null);
          }
          
          const datosCliente = results[0];
          
          return callback(null, datosCliente);
        });
    });
  }
  

module.exports = { obtenerMascotas, obtenerDetallesMascota };
