const db = require('../db');

module.exports={
    buscarTodos:() => {
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM carros', (error, results)=>{
                if(error){rejeitado(error); return;}
                    aceito(results);
            });
        });
    },
    buscarUm: (codigo) =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('SELECT * FROM carros WHERE codigo = ?', [codigo], (error, results)=>{
                if(error){rejeitado(error); return;}
                if(results.length>0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            })
        })
    },
    inserir: (modelo, placa)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO carros (modelo, placa) VALUES (?, ?)',
                [modelo, placa],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertCodigo); //insertId
                }
            );
        });
    },
    alterar:(codigo, modelo, placa)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE carros SET modelo = ?, placa = ? WHERE codigo = ?',
                [modelo, placa, codigo],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },
    excluir: (codigo) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM carros WHERE codigo = ?', [codigo], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
    
                if (results.affectedRows > 0) {
                    // Selecionar os itens subsequentes ao item excluído
                    db.query('SELECT * FROM carros WHERE codigo > ? ORDER BY codigo', [codigo], (error, results) => {
                        if (error) {
                            rejeitado(error);
                            return;
                        }
    
                        const itensSubsequentes = results;
    
                        if (itensSubsequentes.length > 0) {
                            let novoCodigo = codigo;
    
                            // Atualizar os códigos identificadores dos itens subsequentes
                            const atualizarCodigo = (indice) => {
                                if (indice >= itensSubsequentes.length) {
                                    // Todos os códigos foram atualizados
                                    aceito(results);
                                    return;
                                }
    
                                const item = itensSubsequentes[indice];
    
                                db.query('UPDATE carros SET codigo = ? WHERE codigo = ?', [novoCodigo, item.codigo], (error, results) => {
                                    if (error) {
                                        rejeitado(error);
                                        return;
                                    }
    
                                    novoCodigo++;
                                    atualizarCodigo(indice + 1);
                                });
                            };
    
                            atualizarCodigo(0);
                        } else {
                            aceito(results);
                        }
                    });
                } else {
                    aceito(results);
                }
            });
        });
    }
    
};