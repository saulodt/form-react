>> COMO RODAR O PROJETO CLONADO

Instalar as dependencias indicada pelo package.json
### npm install

Criar a base de dados no MySQL
Alterar as credenciais do banco de dados no arquivo ".env"

Executar as migrations
### npx sequelize-cli db:migrate

Rodar o projeto usando o nodemon
### nodemon app.js

Abrir o endereço no navegador para acessar a página inicial
### http://localhost:8080


>> SEQUENCIA CASO QUEIRA CRIAR O PROJETO

Criar o arquivo package
### npm init

Gerenciar as requisições, rotas e URLs, entre outra funcionalidades
### npm install --save express

Rodar o projeto
### node app.js

Instalar a dependência de forma global no terminal. OBS: Caso nunca tenha instalado na sua maquina, executar o comando no prompt, após instalar, reiniciar o PC.
### npm install -g nodemon

Instalar a dependência como desenvolvedor para reiniciar o servidor sempre que houver alteração no código fonte.
### npm install --save-dev nodemon

Rodar o projeto usando o nodemon
### nodemon app.js

Abrir o endereço no navegador para acessar a página inicial
### http://localhost:8080

Comando SQL para criar a base de dados
### CREATE DATABASE formulario CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

Instalar o Sequelize
### npm install --save sequelize
<!-- Sequelize é uma biblioteca Javascript que facilita o gerenciamento do banco de dados SQL -->

Instalar o drive do banco de dados
### npm install --save mysql2

Instalar o Sequelize-cli somente como dev
### npm install --save-dev sequelize-cli
<!-- Sequelize-cli, interface de linha de comando usada para criar modelos, configurações e arquivos de migração para bancos de dados -->

Iniciar o Sequelize-cli e criar o arquivo config
### npx sequelize-cli init

Manipular variáveis de ambiente
### npm install dotenv --save

Criar Models Form
### npx sequelize-cli model:generate --name Form --attributes nome:string,sobrenome:string,email:string,telefone:string,cidade:string,volume:integer,produtoConhecido:boolean,descricaoFinalidade:string,produtos:text,acordoPolitica:boolean. 
<!-- O campo de "produtos" foi adicionado de forma manual na 'migration' e na 'models/form,js'. -->

Executar as migrations
### npx sequelize-cli db:migrate

Permitir requisição externa
### npm install cors

