import { DataTypes } from "sequelize";
import { conecta } from "../config/conecta";

export const TipoUsuarioSchema = conecta.define("Tipo_usuario", {
  id_tipo_usuario: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  desc_tipo_usuario: { type: DataTypes.STRING(), allowNull: false },
}, {
  tableName: 'Tipo_usuario'
});

(TipoUsuarioSchema as any).associate = function (schema: any) {
  this.hasMany(schema.UsuarioSchema, {
    foreignKey: "id_tipo_usuario",
    as: "usuarios"
  });
};

export class TipoUsuarioQuery{
    schema(){
        return TipoUsuarioSchema;
    }

    async getTodosTiposUsuario(){
      return await TipoUsuarioSchema.findAll();
    }
}