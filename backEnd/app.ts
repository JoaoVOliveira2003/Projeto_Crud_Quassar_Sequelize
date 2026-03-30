import express from "express";
import cors from "cors";
import { conecta } from "./config/conecta.js";
import { UsuarioSchema } from "./schema/Usuario.js";
import { Cidade } from "./schema/Cidade.js";
import { Endereco } from "./schema/Endereco.js";

import { routerUsuarios } from "./routes/usuarios.ts";

const app = express();
app.use(cors());
app.use(express.json());


const db = { UsuarioSchema, Endereco, Cidade, conecta };
Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});


app.use("/usuario", routerUsuarios);


export default app;
