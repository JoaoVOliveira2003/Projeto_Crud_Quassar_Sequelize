import { DataType, DataTypes } from "sequelize";
import { conecta } from "../config/conecta";
import { DadosUsuario } from "../interfaces/usuarioInterface";
import { UsuarioSchema } from "./usuario-schema";

export const LoginSchema = conecta.define("login",{
    id_usuario : {type: DataTypes.INTEGER, primaryKey:true},
    email: {type:DataTypes.STRING(), allowNull:false},
    senha: {type:DataTypes.STRING(), allowNull:false}
});

(LoginSchema as any).associate = function (schema: any) {
  this.belongsTo(schema.UsuarioSchema, {
    foreignKey: "id_usuario",
    as: "usuario",
  });
};

export class LoginQuery {
    schema(){return LoginSchema;}

}