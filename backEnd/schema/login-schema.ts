import { fn, col, DataTypes } from "sequelize";
import { conecta } from "../config/conecta";
import { UsuarioSchema } from "./usuario-schema";


export const LoginSchema = conecta.define(
  "Login",
  {
    id_usuario: { type: DataTypes.INTEGER, primaryKey: true },
    email: { type: DataTypes.STRING(), allowNull: false },
    senha: { type: DataTypes.STRING(), allowNull: false },
  },
  {
    tableName: "Login",
    freezeTableName: true,
  },
);

(LoginSchema as any).associate = function (schema: any) {
  this.belongsTo(schema.UsuarioSchema, {
    foreignKey: "id_usuario",
    as: "usuario",
  });
};

export class LoginQuery {
  schema() {
    return LoginSchema;
  }

  async criarLogin(login: any) {
    try {
      return await LoginSchema.create({
        email: login.email,
        senha: login.senha,
        id_usuario: login.id_usuario,
      });
    } catch (error) {
      throw error;
    }
  }

async realizarLogin(login: any) {
  try {

    const result = await LoginSchema.findAll({
      attributes: ["id_usuario", [fn("COUNT", col("*")), "total"]],
      where: {
        email: login.email,
        senha: login.senha,
      },
      group: ["id_usuario"],
      raw: true
    });
    return result;

  } catch (error) {
    console.log("ERRO:", error);
    throw error;
  }
}

}
