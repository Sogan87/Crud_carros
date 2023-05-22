const express = require ('express');
const router = express.Router();

const carroController = require('./controllers/carroController');

router.get('/carros', carroController.buscarTodos);

module.exports = router;