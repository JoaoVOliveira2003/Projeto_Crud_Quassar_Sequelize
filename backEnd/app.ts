import express from "express";
import cors from "cors";

import { UsuarioSchema } from "./schema/usuario-schema.ts";
import { CidadeSchema } from "./schema/cidade-shema.ts";
import { LoginSchema} from './schema/login-schema.ts';
import { TipoUsuarioSchema} from './schema/tipoUsuario-schema.ts'
import { EnderecoSchema } from "./schema/endereco-schema.ts";

import { routerUsuarios } from "./routes/usuarios.ts";
import { routerCidades  } from "./routes/cidades.ts";
import { routerLogin } from "./routes/login.ts";
import { routerTipoUsuarios} from "./routes/tipoUsuarios.ts"

import "dotenv/config";

const app = express();
app.use(cors(
  {exposedHeaders: ['Authorization'] }
));
app.use(express.json());

const db = { UsuarioSchema, EnderecoSchema, CidadeSchema,LoginSchema,TipoUsuarioSchema };


(Object.values(db) as any).forEach((schema: any) => {
  if (schema.associate) {
    schema.associate(db);
  }
});

app.use("/usuario", routerUsuarios);
app.use("/cidade", routerCidades);
app.use("/login/",routerLogin);
app.use("/tiposUsuarios/",routerTipoUsuarios);

export default app;
