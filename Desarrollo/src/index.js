const express = require ('express')
const morgan = require ('morgan')
var path = require('path');
const app = express();

app.set('port', process.env.PORT || 4000);

app.use(morgan('dev'));

app.listen(app.get('port'), () =>{
    console.log('Servidor iniciado en el puerto', app.get('port') )
})

var publicPath = path.resolve(__dirname, './public')

app.use(express.static(publicPath));

app.use(require('./routes'))

/*
var mysql = require ('mysql2')

var conexion = mysql.createConnection({
    host: 'localhost',
    database: 'bd_veterinaria',
    user: 'root',
    password: ''
});

conexion.connect(function (error){
    if (error){
        throw error;
    }else{
        console.log('Conexion exitosa');
    }
});

conexion.end();
*/