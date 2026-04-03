import { DataTypes } from 'sequelize';
import { conecta } from "../config/conecta.js";

export const CidadeSchema = conecta.define('Cidade', {
  cod_cidade: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  desc_cidade: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

CidadeSchema.associate = function (schema) {
  this.hasMany(schema.EnderecoSchema, {
    foreignKey: "cod_cidade",
  });
};

export class CidadeQuery {
  schema() {return CidadeSchema}

  async getTodasCidades(){
    return await CidadeSchema.findAll();
  }

}
