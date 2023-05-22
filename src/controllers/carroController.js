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
    },
    buscarUm: async (req, res) =>{
        let json = {error: '', result:{}};
        let codigo = req.params.codigo;
        let carro = await carroService.buscarUm(codigo);
        if(carro){
            json.result = carro;
        }
        res.json(json);
    }
}