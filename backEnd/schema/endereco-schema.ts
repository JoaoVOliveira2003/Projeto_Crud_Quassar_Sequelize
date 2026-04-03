import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta.js";

export const EnderecoSchema = conecta.define('Endereco', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rua: { type: DataTypes.STRING, allowNull: false },
  numero: { type: DataTypes.INTEGER, allowNull: false },
  cod_cidade: { type: DataTypes.INTEGER, allowNull: false },
  id_usuario: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'usuario', key: 'id' } },
});

export class EnderecoQuery {
  schema() {return EnderecoSchema}

  async getTodasCidades(){
    return await EnderecoSchema.findAll();
  }

  async criarEndereco(endereco) {
      const t = await conecta.transaction();
      try {
  
        return await EnderecoSchema.create(
          endereco,
          { transaction: t },
        );
      } catch (error) {}
    }


}
