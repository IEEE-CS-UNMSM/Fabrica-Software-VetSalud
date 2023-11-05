const express = require('express')
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const rutaAbsoluta = path.resolve(__dirname, '..', 'view', 'index.html');
    res.sendFile(rutaAbsoluta);
  });


module.exports = router;