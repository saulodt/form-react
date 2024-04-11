'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      sobrenome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      cidade: {
        type: Sequelize.STRING
      },
      volume: {
        type: Sequelize.INTEGER
      },
      produtoConhecido: {
        type: Sequelize.STRING
      },
      descricaoFinalidade: {
        type: Sequelize.STRING
      },
      produtos: {
        type: Sequelize.TEXT,
        get() { // Converter os dados armazenados (que está em formato JSON) de volta em JS ou array usando o JSON.parse
          // Obter os valores já convertidos de JSON para array
          return JSON.parse(this.getDataValue('produtos'));
        },
        set(val) { // Pega o valor (que é um objeto/array) e converte esse valor em uma string JSON
           // Salvar os valores convertidos de array para JSON
          this.setDataValue('produtos', JSON.stringify(val));
        }
      },
      acordoPolitica: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Forms');
  }
};