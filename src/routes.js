const express = require ('express');
const router = express.Router();

const carroController = require('./controllers/carroController');

router.get('/carros', carroController.buscarTodos);
router.get('/carro/:codigo', carroController.buscarUm);

module.exports = router;