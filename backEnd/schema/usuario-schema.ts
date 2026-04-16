import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";
import { EnderecoSchema } from "./endereco-schema.js";
import { CidadeSchema } from "./cidade-shema.js";
import { DadosUsuario } from "../interfaces/usuarioInterface";
import { LoginSchema } from "./login-schema.js";

export const UsuarioSchema = conecta.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(), allowNull: false },
  dataDeNascimento: { type: DataTypes.DATE, allowNull: true },
  peso: { type: DataTypes.INTEGER, allowNull: true },
  altura: { type: DataTypes.FLOAT, allowNull: true },
  criadoPor: { type: DataTypes.INTEGER, allowNull: true },
});

(UsuarioSchema as any).associate = function (schema: any) {
  this.hasMany(schema.EnderecoSchema, {
    foreignKey: "id_usuario",
    as: "endereco",
  });
  this.hasMany(schema.LoginSchema, {
    foreignKey: "id_usuario",
    as: "login",
  });
};

export class UsuarioQuery {
  schema() {
    return UsuarioSchema;
  }

  async getUsuarios() {
    try {
      return await UsuarioSchema.findAll({
        include: [
          {
            model: EnderecoSchema,
            as: "endereco",
            required: true,
            include: [
              {
                model: CidadeSchema,
                as: "cidade",
                required: true,
              },
            ],
          },
          {
            model: LoginSchema,
            as: "login",
            attributes: ["email"],
            required: true,
          },
        ],
        order: [["id", "desc"]],
      });
    } catch (error) {
      return error;
    }
  }

  async criarUsuario(usuario: DadosUsuario) {
    try {
      return await UsuarioSchema.create(usuario as any);
    } catch (error) {
      throw error;
    }
  }

  async deletarUsuario(id: number) {
    try {
      return UsuarioSchema.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async atualizarUsuario(id: number, usuario: DadosUsuario) {
    try {
      const [linhasAfetadas] = await UsuarioSchema.update(usuario, {
        where: { id },
      });

      return linhasAfetadas;
    } catch (error) {
      throw error;
    }
  }
}
