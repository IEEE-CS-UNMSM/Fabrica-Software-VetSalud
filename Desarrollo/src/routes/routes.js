const express = require('express')
const path = require('path');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const ClienteController = require('../controllers/cliente.controller');
const CitasController = require('../controllers/citas.controller');
const bodyParser = require('body-parser');
const { enviarCorreoElectronico } = require('../services/email.service');
const { log } = require('console');
const fs = require('fs');
const { formatoFecha } = require('../services/utilidades');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.get('/', (req, res) => {
  res.sendFile('./src/view/index.html');
});

router.get('/signUp.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signUp.html'));
});

router.post('/signUp.html', async (req, res) => {
  const { nombres, apellidos, direccion, dni, numero, correo, contrasena } = req.body;

  // Crear un objeto con los datos del usuario
  const nuevoUsuario = {
    DNI_USUARIO: dni,
    NOMBRES_USUARIO: nombres,
    APELLIDOS_USUARIO: apellidos,
    DIRECCION_USUARIO: direccion,
    CELULAR_USUARIO: numero,
    EMAIL_USUARIO: correo,
    PASSWORD_USUARIO: contrasena,
    ROL_USUARIO: 'cliente', // Asigna el rol
  };

  ClienteController.registrarUsuario(nuevoUsuario, (error, resultado) => {
    if (error) {
      res.status(500).json({ error: 'Error al registrar usuario' });
    }else{
      enviarCorreoElectronico(correo);
      console.log('Usuario registrado correctamente');
    }
  }); 
});

router.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

router.post('/login.html', async (req, res) => {
  const { correo, contrasena } = req.body;
  // Buscar al usuario por su correo electrónico en la base de datos
  ClienteController.obtenerUsuarioPorCorreo(correo, async (error, usuario) => {
    if (error) {
        return res.status(500).json({ error: 'Error al buscar usuario' });
    }
    if (!usuario) {
        return res.status(401).json({ error: 'Credenciales de correo incorrectas' });
    }
    
    try{
      // Verificar la contraseña utilizando bcrypt
        const contrasenaValida = await bcrypt.compare(contrasena, usuario.PASSWORD_USUARIO);
      //test
      //  console.log('Contraseña proporcionada:', contrasena);
      //  console.log('Contraseña almacenada (hash):', usuario.PASSWORD_USUARIO);
      //  console.log('¿Contraseña válida?', contrasenaValida);

      if (!contrasenaValida) {
          return res.status(401).json({ error: 'Credenciales de contraseña incorrectas' });
      } else{
          // Redirigir al perfil del usuario
          console.log('Inicio de sesion con exito, redireccionando ...');
          res.redirect(`/perfilUser/${usuario.ID_USUARIO}`);
      }
    } catch (bcryptError) {
        console.error('Error al comparar contraseñas:', bcryptError);
        return res.status(500).json({ error: 'Error interno al comparar contraseñas' });
    }
  });
});

//routes.js
router.get('/perfilUser/:usuarioId', async (req, res) => {
  const usuarioId = req.params.usuarioId;
  console.log(usuarioId);
  ClienteController.obtenerUsuarioPorId(usuarioId, async (error, usuario) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener datos del usuario' });
    }
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Obtener las mascotas del usuario
    ClienteController.obtenerMascotasPorUsuario(usuarioId, async (errorMascotas, mascotas) => {
      if (errorMascotas) {
        return res.status(500).json({ error: 'Error al obtener mascotas del usuario' });
      }

      // Leer el contenido del archivo HTML
      const filePath = path.join(__dirname, '..', 'view', 'perfilUser.html');
      let htmlContent = fs.readFileSync(filePath, 'utf-8');

      // Reemplazar los marcadores de posición con los datos reales del usuario
      htmlContent = htmlContent.replace('{{usuario.ID_USUARIO}}', usuario.ID_USUARIO);
      htmlContent = htmlContent.replace('{{usuario.NOMBRES_USUARIO}}', usuario.NOMBRES_USUARIO);
      htmlContent = htmlContent.replace('{{usuario.APELLIDOS_USUARIO}}', usuario.APELLIDOS_USUARIO);
      htmlContent = htmlContent.replace('{{usuario.DIRECCION_USUARIO}}', usuario.DIRECCION_USUARIO);
      htmlContent = htmlContent.replace('{{usuario.DNI_USUARIO}}', usuario.DNI_USUARIO);
      htmlContent = htmlContent.replace('{{usuario.CELULAR_USUARIO}}', usuario.CELULAR_USUARIO);
      // Repite este proceso para otros marcadores de posición según sea necesario

      // Generar dinámicamente el contenido de las mascotas
      let mascotasHTML = '';
      mascotas.forEach((mascota, index) => {
        mascotasHTML += `
          <div class="mascotaDatos M${index + 1}">
            <img id="fotoPerfil" src="data:image/png;base64,${mascota.IMAGEN_MASCOTA.toString('base64')}" alt="PhotoMascota">
            <div class="dato">
              <label for="nombre"><strong></strong><span id="nombre">${mascota.NOMBRE_MASCOTA}</span></label>
              <label for="especie"><strong></strong><span id="especie">${mascota.ESPECIE_MASCOTA}</span></label>
              <label for="sexo"><strong></strong><span id="sexo">${mascota.SEXO_MASCOTA}</span></label>
              <label for="fechanacimiento"><strong></strong><span id="fechanacimiento">${formatoFecha(mascota.FECHA_NACIMIENTO_MASCOTA)}</span></label>
            </div>
          </div>
        `;
      });

      // Reemplazar el marcador de posición de mascotas en el HTML
      htmlContent = htmlContent.replace('{{mascotas}}', mascotasHTML);

      // Enviar el archivo HTML modificado al cliente
      res.send(htmlContent);
    });
  });
});

router.get('/registroMascota/:usuarioId', async (req, res) => {
  const usuarioId = req.params.usuarioId;
  console.log(usuarioId);
  ClienteController.obtenerUsuarioPorId(usuarioId, async (error, usuario) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener datos del usuario' });
    }

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.sendFile(path.join(__dirname, '..', 'view', 'registroMascota.html'));
  });
});

router.post('/registroMascota/:usuarioId', upload.fields([{ name: 'photo', maxCount: 1 }, { name: 'evidence', maxCount: 1 }]), async (req, res) => {
  const usuarioId = 19;
  console.log(usuarioId);
  const { nombre, tipo, raza, sexo, fecha } = req.body;

  // Obtener la ruta de la foto y evidencia desde el objeto de archivos
  const foto = req.files['photo'][0].path;
  const evidencia = req.files['evidence'][0].path;

  console.log('Datos recibidos:', { usuarioId, nombre, tipo, raza, sexo, fecha, foto, evidencia });

  ClienteController.registrarMascota(usuarioId, nombre, tipo, raza, sexo, fecha, foto, evidencia, (error, resultado) => {
    if (error) {
      console.error('Error al registrar la mascota:', error);
      return res.status(500).json({ error: 'Error al registrar la mascota' });
    }
    console.log('Mascota registrada correctamente');
    // Redirigir de nuevo al perfil del usuario después de registrar la mascota
    res.redirect(`/perfilUser/${usuarioId}`);
  });
});


router.get('/obtener-usuarios', ClienteController.obtenerUsuarios);
router.get('/obtener-citas', CitasController.obtenerCitas);
module.exports = router;