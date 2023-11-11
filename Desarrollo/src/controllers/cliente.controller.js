const { createConnection } = require('../database/database.js');

function obtenerUsuarios(req, res) {
  const connection = createConnection();

  connection.connect(function (error) {
    if (error) {
      throw error;
    } else {
      connection.query('SELECT * FROM tb_usuario', (err, results) => {
        if (err) {
            connection.end();
            res.status(500).json({ error: 'Error al obtener usuarios' });
        } else {
            console.log(results);
            // Enviar las filas como respuesta JSON
            res.json(results);
  
            connection.end();
      }});
    }
  });
}

module.exports = obtenerUsuarios;
