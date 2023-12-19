const { createConnection } = require('../database/database.js');

function guardarFichaMedica(fichaMedica, callback) {
  const connection = createConnection();

  connection.connect((error) => {
    if (error) {
      return callback(error, null);
    }

    const query = `
      INSERT INTO TB_FICHA_MEDICA (ID_CITA, FECHA_CREACION, ANTECEDENTES, DIAGNOSTICO, TRATAMIENTO)
      VALUES (?, ?, ?, ?, ?);`;

      const { citaId, fecha, antc, diag, trat } = fichaMedica;

      connection.query(
        query,
        [citaId, fecha, antc, diag, trat],
      (err, results) => {
        connection.end();

        if (err) {
          console.log(err);
          return callback(err, null);
        }

        const fichaMedicaId = results.insertId;
        return callback(null, { id: fichaMedicaId });
      }
    );
  });
}

function obtenerFichasMedicas(callback) {
  const connection = createConnection();

  connection.connect((error) => {
    if (error) {
      return callback(error, null);
    }

    connection.query('SELECT * FROM VW_HISTORIAL_FICHAS', (err, results) => {
      connection.end();

      if (err) {
        return callback(err, null);
      }

      if (results.length === 0) {
        return callback({ message: 'Ficha médica no encontrada' }, null);
      }

      return callback(null, results);
    });
  });
}

module.exports = { guardarFichaMedica, obtenerFichasMedicas };
