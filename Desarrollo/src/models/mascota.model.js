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

module.exports = { obtenerMascotas };
