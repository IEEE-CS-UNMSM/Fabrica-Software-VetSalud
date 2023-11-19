const { createConnection } = require('../database/database.js');

function obtenerClientes(callback) {
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

function obtenerDetallesCliente(idCliente, callback) {
  const connection = createConnection();

  connection.connect((error) => {
    if (error) {
      return callback(error, null);
    }
    const query = `
      SELECT NOMBRES_USUARIO AS Nombres, APELLIDOS_USUARIO AS Apellidos, DNI_USUARIO AS DNI, CELULAR_USUARIO AS Celular, DIRECCION_USUARIO AS Direccion 
      FROM tb_usuario WHERE DNI_USUARIO = ?;`;
    connection.query(query, [idCliente], (err, results) => {
      connection.end();

      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback({ message: 'Cliente no encontrado' }, null);
      }
      
      const datosCliente = results[0];
      return callback(null, datosCliente);
    });
  });
}

module.exports = { obtenerDetallesCliente , obtenerClientes };
