import { DataTypes } from 'sequelize';
import { conecta } from "../config/conecta.js";

export const Cidade = conecta.define('Cidade', {
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

Cidade.associate = (models) =>{
  Cidade.hasMany(models.Endereco,{
    foreignKey:"cod_cidade"
  })
}

Cidade.buscarComEnderecos = async function () {
  return await Cidade.findAll({
    include: [{ model: Endereco }],
  });
};

// export class CidadeFunctions{
    
// }