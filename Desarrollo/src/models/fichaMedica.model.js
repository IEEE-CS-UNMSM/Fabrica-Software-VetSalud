const { createConnection } = require('../database/database.js');

function guardarFichaMedica(fichaMedica, callback) {
  const connection = createConnection();

  connection.connect((error) => {
    if (error) {
      return callback(error, null);
    }

    const query = `
      INSERT INTO TB_FICHA_MEDICA (ID_MASCOTA, FECHA_CREACION, ANTECEDENTES, GRUPO_SANGUINEO, DIAGNOSTICO, TRATAMIENTO)
      VALUES (?, ?, ?, ?, ?, ?);`;

    const { idMascota, fechaCreacion, antecedentes, grupoSanguineo, diagnostico, tratamiento } = fichaMedica;

    connection.query(
      query,
      [idMascota, fechaCreacion, antecedentes, grupoSanguineo, diagnostico, tratamiento],
      (err, results) => {
        connection.end();

        if (err) {
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
