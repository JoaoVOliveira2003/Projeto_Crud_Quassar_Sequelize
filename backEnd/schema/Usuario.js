import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta.js";

export const UsuarioSchema = conecta.define('Usuario', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    dataDeNascimento: { type: DataTypes.DATE, allowNull: true },
    peso: { type: DataTypes.INTEGER, allowNull: true },
    altura: { type: DataTypes.FLOAT, allowNull: true }
})

UsuarioSchema.associate = (models) =>{
    UsuarioSchema.hasMany(models.Endereco,{
        foreignKey:"id_usuario"
    });
}

export class UsuarioQuery {

    schema () { return UsuarioSchema }

    async getUsuarios () {
        return await UsuarioSchema.findAll()
    }
}
