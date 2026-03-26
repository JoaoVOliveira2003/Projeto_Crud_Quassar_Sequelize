import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta.js";

export const Endereco = conecta.define('Endereco', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rua: { type: DataTypes.STRING, allowNull: false },
  numero: { type: DataTypes.INTEGER, allowNull: false },
  cod_cidade: { type: DataTypes.INTEGER, allowNull: false },
  id_usuario: { type: DataTypes.INTEGER, allowNull: false },
});

Endereco.associate = (models) =>{
  Endereco.belongsTo(models.Usuario,{
    foreignKey:"id_usuario"
  });

  Endereco.belongsTo(models.Cidade,{
    foreignKey:"cod_cidade"
  });
}