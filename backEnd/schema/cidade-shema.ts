import { DataTypes,Op, } from 'sequelize';
import { conecta } from "../config/conecta";

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

(CidadeSchema as any).associate = function (schema: any) {
  this.hasMany(schema.EnderecoSchema, {
    foreignKey: "cod_cidade",
  });
};

export class CidadeQuery {
  schema() {return CidadeSchema}

  //Cara,se vc quiser fazer os where,like da vida, por favor utilize o Op !!!
  async getTodasCidades(){
    return await CidadeSchema.findAll();
  }

}
