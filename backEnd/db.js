import { conecta } from "./config/conecta";
import { Usuario } from "./models/Usuario.js";
import { Cidade } from "./models/Cidade.js";
import { Endereco } from "./models/Endereco.js";

const db = { Usuario, Endereco, Cidade, conecta };

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});
export default db;