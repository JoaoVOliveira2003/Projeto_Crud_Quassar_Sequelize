import express from "express";
import { sequelize } from "./config/conecta.js";
import { Usuario } from "./models/Usuario.js";

const app = express();
app.use(express.json());

// cria tabela automaticamente
await sequelize.sync();

app.get("/teste", (req, res) => {
  res.json({ ok: true });
});

app.get("/getUsuarios", async (req, res) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
});

app.post("/createUsuario", async (req, res) => {
  const { nome } = req.body;
  const usuario = await Usuario.create({ nome });
  res.json(usuario);
});

app.put("/atualizarUsuario/:id", async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  const usuario = await Usuario.update({ nome }, { where: { id } });
});

app.delete("/deleteUsuarios/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const deletado = Usuario.destroy({ where: { id } });
    if (deletado === 0) {
      return res.status(404).json({ msg: "Usuario não encontrato" });
    }
    res.json({ msg: "Usuario deletado!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
