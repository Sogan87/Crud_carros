const carroService = require('../services/carroServices');

module.exports = {
    buscarTodos: async (req, res) =>{
        let json = {error: '', result:[]};

        let carros = await carroService.buscarTodos();

        for(let i in carros){
            json.result.push({
                codigo: carros[i].codigo,
                descricao: carros[i].modelo,

            });
        }
        res.json(json);
    }
}