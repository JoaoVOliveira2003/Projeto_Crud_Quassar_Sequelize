import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";
import { EnderecoSchema } from "./endereco-schema.js";
import { CidadeSchema } from "./cidade-shema.js";

export const UsuarioSchema = conecta.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(), allowNull: false },
  dataDeNascimento: { type: DataTypes.DATE, allowNull: true },
  peso: { type: DataTypes.INTEGER, allowNull: true },
  altura: { type: DataTypes.FLOAT, allowNull: true },
});

UsuarioSchema.associate = function (schema) {
  this.hasMany(schema.EnderecoSchema, {
    foreignKey: "id_usuario",
    as: "endereco",
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
            include: [
              {
                model: CidadeSchema,
                as: "cidade",
              },
            ],
          },
        ],
      });
    } catch (error) {
      return error;
    }
  }

  async criarUsuario(usuario) {
    try {
      return await UsuarioSchema.create(usuario);
    } catch (error) {
      throw error;
    }
  }

  async deletarUsuario(id) {
    try {
      return UsuarioSchema.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

  async atualizarUsuario(id, usuario) {
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
