'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    
    static associate(models) {

    }
  }
  Form.init({ // Indicando quais são as colunas que salvo no meu banco de dados
    nome: DataTypes.STRING,
    sobrenome: DataTypes.STRING,
    email: DataTypes.STRING,
    telefone: DataTypes.STRING,
    cidade: DataTypes.STRING,
    volume: DataTypes.INTEGER,
    produtoConhecido: DataTypes.STRING,
    descricaoFinalidade: DataTypes.STRING,
    produtos: {
      type: DataTypes.TEXT,
      get() {
        // Desserializa o valor JSON para um objeto/array JavaScript ao acessar
        const value = this.getDataValue('produtos');
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        // Serializa o objeto/array JavaScript para uma string JSON ao salvar
        this.setDataValue('produtos', JSON.stringify(value));
      }
    },
    acordoPolitica: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Form',
  });
  return Form;
};