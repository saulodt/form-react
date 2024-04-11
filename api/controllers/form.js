// Gerenciar requisições, rotas e URLs, entre outras funcionalidades.
const express = require("express");

// Incluir a conexão com o banco de dados
const db = require("../db/models");

// Chamar a função express
// Preparando para trabalhar somente com rotas
const router = express.Router();

// Criar rota de registro
router.post("/", async (req, res) => {

    // Receber os dados enviados no corpo da requisição
    var formValues = req.body;

    //Salvar no banco de dados
    await db.Form.create(formValues).then((formValuesForm) => {
        return res.json({
            error: false,
            message: "Formulário registrado com sucesso!",
            formValues: formValuesForm
        });
    }).catch((error) => {
        return res.json({
            error: true,
            message: "Erro: Não foi possível registrar o formulário!",
            dbError: error.message, // Adiciona esta linha para ver a mensagem de erro do banco de dados
        });

    });
});

module.exports = router;