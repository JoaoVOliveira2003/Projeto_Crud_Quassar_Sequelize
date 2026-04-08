import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";
import {enderecoInterface} from "../interfaces/enderecoInterface"
import {DadosUsuario} from "../interfaces/usuarioInterface"

export const EnderecoSchema = conecta.define("Endereco", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rua: { type: DataTypes.STRING, allowNull: false },
  numero: { type: DataTypes.INTEGER, allowNull: false },
  cod_cidade: { type: DataTypes.INTEGER, allowNull: false },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "usuario", key: "id" },
  },
});

(EnderecoSchema as any).associate = function (schema: any) {
  this.belongsTo(schema.UsuarioSchema, {
    foreignKey: "id_usuario",
  });

  this.belongsTo(schema.CidadeSchema, {
    foreignKey: "cod_cidade",
    as: "cidade",
  });
};

export class EnderecoQuery {
  schema() {
    return EnderecoSchema;
  }

  async getTodasCidades() {
    return await EnderecoSchema.findAll();
  }

  async criarEndereco(endereco : any) {
    try {
      return await EnderecoSchema.create(endereco);
    } catch (error) {
      throw error;
    }
  }

  async deletarEndereco(id : number) {
    try {
      return EnderecoSchema.destroy({ where: { id } });
    } catch (error) {
      throw error;
    }
  }

async atualizarEndereco(id_usuario : number, usuario : enderecoInterface) {
  try {
    const [linhasAfetadas] = await EnderecoSchema.update(usuario, { where: { id_usuario: id_usuario }});
    return linhasAfetadas;
  } catch (error) {
    throw error;
  }
}

}
