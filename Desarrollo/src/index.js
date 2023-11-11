const express = require ('express')
const morgan = require ('morgan')
var path = require('path');

const app = express();

app.set('port', 4000);

app.use(morgan('dev'));

app.listen(app.get('port'), () =>{
    console.log('Servidor iniciado en el puerto', app.get('port') )
})

// Configurar la ruta para obtener usuarios
const obtenerUsuarios = require('./controllers/cliente.controller.js');
app.get('/obtener-usuarios', obtenerUsuarios);

//Public
app.use(express.static('./src/public'));
app.use(express.static('./src/view'));

//Routes
app.use(require('./routes'))
