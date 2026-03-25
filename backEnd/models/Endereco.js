import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta.js";
import { Usuario } from "./Usuario.js";
import { Cidade } from "./Cidade.js";

export const Endereco = conecta.define('Endereco', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rua: { type: DataTypes.STRING, allowNull: false },
  numero: { type: DataTypes.INTEGER, allowNull: false },
  cod_cidade: { type: DataTypes.INTEGER, allowNull: false },
  id_usuario: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'endereco', timestamps: false });