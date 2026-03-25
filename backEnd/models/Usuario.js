import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta.js";

export const Usuario = conecta.define('Usuario',{
    nome:{type:DataTypes.STRING,allowNull:false}
});