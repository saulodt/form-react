// Gerenciar requisições, rotas e URLs, entre outras funcionalidades. 
const express = require("express");

// Chamar a função express
const app = express();

// Criar middleware para receber os dados no corpo da requisição
app.use(express.json());

// Importar a biblioteca para permitir a conexão externa
const cors = require('cors');

// Criar middleware para permitir a requisição externa
app.use((req, res, next) => {
    // Qualquer endereço pode fazer requisição
    res.header("Access-Control-Allow-Origin", "*");
    // Tipos de métodos que a API aceita
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    // Permitir o envio de dados para API
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // Executar o cors
    app.use(cors());
    // Quando não tiver erro deve continuar o processamento
    next();
});

// Incluir a CONTROLLER
const form = require("./controllers/form");

// Criar a rota
app.use('/form', form);

// Iniciando o servidor na porta 8080
app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});