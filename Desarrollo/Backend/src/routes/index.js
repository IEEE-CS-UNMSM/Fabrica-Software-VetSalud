const express = require('express')
const router = express.Router();

var path = require('path');

router.get('/', (req, res) => {
    res.sendFile('index.html', {root: './../Codificacion/Vista'});
  });


module.exports = router;