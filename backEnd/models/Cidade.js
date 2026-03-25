import { DataTypes } from 'sequelize';
import { conecta } from "../config/conecta.js";
import { Endereco } from './Endereco.js';

export const Cidade = conecta.define('Cidade', {
  cod_cidade: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  desc_cidade: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'cidade',
  timestamps: false
});

Cidade.hasMany(Endereco, { as: 'enderecos', foreignKey: 'cod_cidade' });