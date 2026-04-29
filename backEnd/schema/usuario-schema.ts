import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";
import { EnderecoSchema } from "./endereco-schema.js";
import { CidadeSchema } from "./cidade-shema.js";
import { DadosUsuario } from "../interfaces/usuarioInterface";
import { formularioPesquisaInterface } from "../interfaces/formularioPesquisaInterface.js";
import { LoginSchema } from "./login-schema.js";
import { TipoUsuarioSchema } from "./tipoUsuario-schema.js";
import { Op } from "sequelize";

export const UsuarioSchema = conecta.define("Usuario", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: DataTypes.STRING(), allowNull: false },
  dataDeNascimento: { type: DataTypes.DATE, allowNull: true },
  peso: { type: DataTypes.INTEGER, allowNull: true },
  altura: { type: DataTypes.FLOAT, allowNull: true },
  criadoPor: { type: DataTypes.INTEGER, allowNull: true },
  id_tipo_usuario: { type: DataTypes.INTEGER, allowNull: true },
});

(UsuarioSchema as any).associate = function (schema: any) {
  this.hasOne(schema.EnderecoSchema, {
    foreignKey: "id_usuario",
    as: "endereco",
  });
  this.hasOne(schema.LoginSchema, {
    foreignKey: "id_usuario",
    as: "login",
  });
  this.belongsTo(schema.TipoUsuarioSchema, {
    foreignKey: "id_tipo_usuario",
    as: "tipoUsuario",
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
          {
            model: TipoUsuarioSchema,
            as: "tipoUsuario",
            required: true,
          },
        ],
        order: [["id", "asc"]],
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

  async getUsuariosFiltrados(filtros: formularioPesquisaInterface) {
    try {
      const where: any = {};
      if (filtros.nome) {
        where.nome = { [Op.like]: `%${filtros.nome}%` };
      }

      const whereTipoUsuario: any = {};

      if (filtros.tipoUsuario) {
        whereTipoUsuario.tipoUsuario_id = filtros.tipoUsuario;
      }

      return await UsuarioSchema.findAll({
        where,
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
          {
            model: TipoUsuarioSchema,
            as: "tipoUsuario",
            required: !!filtros.tipoUsuario,
            where: filtros.tipoUsuario ? { id_tipo_usuario: filtros.tipoUsuario } : undefined,
          },
        ],
        order: [["id", "desc"]],
      });
    } catch (error) {
      return error;
    }
  }

  async verificarTipoUsuario(id_usuario: number, id_tipo_usuario: number) {
    try {
      const retorno = await UsuarioSchema.findOne({
        where: {
          id: id_usuario,
          id_tipo_usuario: id_tipo_usuario,
        },
      });
      return !!retorno;
    } catch (error) {
      throw error;
    }
  }
}
