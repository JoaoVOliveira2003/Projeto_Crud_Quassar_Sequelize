import { DataTypes } from "sequelize";
import { sequelize } from "../config/conecta.js";

export const Usuario = sequelize.define('Usuario',{
    nome:{type:DataTypes.STRING,allowNull:false}
});