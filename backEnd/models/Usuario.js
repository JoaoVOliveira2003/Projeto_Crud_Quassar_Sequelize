import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta.js";

export const Usuario = conecta.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    dataDeNascimento: { type: DataTypes.DATE, allowNull: true },
    peso: { type: DataTypes.INTEGER, allowNull: true },
    altura: { type: DataTypes.FLOAT, allowNull: true },
});

Usuario.associate = (models) =>{
    Usuario.hasMany(models.Endereco,{
        foreignKey:"id_usuario"
    });
}