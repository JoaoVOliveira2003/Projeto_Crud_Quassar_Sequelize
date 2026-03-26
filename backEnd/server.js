import express from "express";
import { conecta } from "./config/conecta.js";
import { Usuario } from "./models/Usuario.js";
import { Cidade } from "./models/Cidade.js";
import { Endereco } from "./models/Endereco.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const db = { Usuario, Endereco, Cidade, conecta };

Object.values(db).forEach((model) => {
  if (model.associate) {
    model.associate(db);
  }
});
export default db;

app.get("/recriarBanco", async (req, res) => {
  try {
    await conecta.sync({ force: true });
    res.send("Banco recriado!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao sincronizar banco.");
  }
});

app.get("/teste", (req, res) => {
  res.json({ ok: true });
});

app.get("/getUsuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({ order: [["id", "ASC"]] });
  res.json(usuarios);
});

app.get("/getTodosDadosUsuario/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findOne({
      where: { id },
      include: [
        {
          model: Endereco,
          as: "enderecos",
          include: [{ model: Cidade, as: "cidade" }],
        },
      ],
    });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
});

app.get("/getCidades", async (req, res) => {
  const cidades = await Cidade.findAll();
  res.json(cidades);
});

app.delete("/deleteUsuarios/:id", async (req, res) => {
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

app.delete("/deleteTodosDadosUsuario/:id", async (req, res) => {
  try {
    const t = await conecta.transaction();
    const { id } = req.params;

    await Endereco.destroy({ where: { id_usuario: id }, transaction: t });
    await Usuario.destroy({ where: { id }, transaction: t });

    await t.commit();
    res.json({ message: "Deu certo" });

    if (deletado === 0 || deletado2 === 0) {
      return res.status(404).json({ msg: "Usuario não encontrato" });
    }

    res.json({ msg: "Usuario deletado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error.message });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

app.post("/createUsuario", async (req, res) => {
  const { nome } = req.body;
  const usuario = await Usuario.create({ nome });
  res.json(usuario);
});

app.post("/createUsuarioTodosDados", async (req, res) => {
  const t = await conecta.transaction();

  try {
    const { nome, dataDeNascimento, peso, altura, rua, numero, cod_cidade } =
      req.body;

    const usuario = await Usuario.create(
      {
        nome,
        dataDeNascimento,
        peso,
        altura,
      },
      { transaction: t },
    );

    const endereco = await Endereco.create(
      {
        rua,
        numero,
        cod_cidade,
        id_usuario: usuario.id,
      },
      { transaction: t },
    );

    await t.commit();
    res
      .status(201)
      .json({ mensagem: "Usuario e endereço criados", usuario, endereco });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({
      erro: "Erro ao criar usuário com endereço",
      detalhes: error.message,
    });
  }
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

app.put("/atualizarDadosUsuario/:id", async (req, res) => {
  const t = await conecta.transaction();

  try {
    const { id } = req.params;
    const { nome, dataDeNascimento, peso, altura, rua, numero, cod_cidade } =
      req.body;

    await Usuario.update(
      { nome, dataDeNascimento, peso, altura },
      { where: { id }, transaction: t },
    );

    await Endereco.update(
      { rua, numero, cod_cidade },
      { where: { id_usuario: id }, transaction: t },
    );

    await t.commit();
    res.status(200).json({ mensagem: "Atualizado!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      erro: "Erro ao atualizar usuário ou endereço",
      detalhes: error.message,
    });
  }
});

app.get("/getTodosDadosUsuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({
    include: [{ model: Endereco, include: [{ model: Cidade }] }],
  });
  res.json(usuarios);
});
