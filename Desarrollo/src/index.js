const express = require ('express')
const morgan = require ('morgan')
var path = require('path');

const app = express();

app.set('port', 4000);
app.use(morgan('dev'));

app.listen(app.get('port'), () =>{
    console.log('Servidor iniciado en el puerto', app.get('port') )
})

//Public
app.use(express.static('./src/public'));
app.use(express.static('./src/view'));

//Routes
app.use(require('./routes/routes.js'))
