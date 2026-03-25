import express from "express";
import { conecta } from "./config/conecta.js";
import { Usuario } from "./models/Usuario.js";
import cors from 'cors'

const app = express();

app.use(cors())
app.use(express.json());

// cria tabela automaticamente
await conecta.sync();

app.get("/teste", (req, res) => {
  res.json({ ok: true });
});

app.get("/getUsuarios", async (req, res) => {
    const usuarios = await Usuario.findAll({ order: [['id', 'ASC']] });
  res.json(usuarios);
});

app.post("/createUsuario", async (req, res) => {
  const { nome } = req.body;
  const usuario = await Usuario.create({ nome });
  res.json(usuario);
});

app.put("/atualizarUsuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome } = req.body;
    const [updated] = await Usuario.update({ nome }, { where: { id } });

    if (updated) {
      const usuarioAtualizado = await Usuario.findByPk(id);
      res.status(200).json(usuarioAtualizado);
    } else {
      res.status(404).json({ message: "Usuário não encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar usuário" });
  }
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
