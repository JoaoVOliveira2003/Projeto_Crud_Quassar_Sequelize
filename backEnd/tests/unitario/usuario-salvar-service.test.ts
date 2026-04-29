import { UsuarioQuery } from "../../schema/usuario-schema.ts";
import { EnderecoQuery } from "../../schema/endereco-schema.ts";
import { LoginQuery } from "../../schema/login-schema.ts";
import { salvarUsuario } from "../../services/usuario-salvar-service.ts";
import { jest } from "@jest/globals";
import * as validacaoMiddleware from "../../middleware/validacao/validacao-middleware.ts";
import CryptoJS from "crypto-js";

process.env.CRYPTO_SECRET = 'chaveSecreta'

describe("salvarUsuario", () => {

  const getMockUsuario = () => ({
    nome: "João Silva",
    dataDeNascimento: "1990-01-01",
    peso: 1,
    altura: 1,
    id_tipo_usuario: 2,
    endereco: {
      rua: "Rua A",
      numero: "123",
      cod_cidade: 1,
    },
    login: {
      email: "joao@email.com",
      senha: "senha123",
    },
    criadoPor: 3
  } as any)

  const mockUsuarioSalvo = { id: 1, nome: "João Silva" }

  beforeEach(() => {
    jest.spyOn(validacaoMiddleware, 'validarObjeto').mockReturnValue([])
    jest.spyOn(CryptoJS, 'HmacSHA256').mockReturnValue({ toString: () => "hash_mocado" } as any)
    jest.spyOn(UsuarioQuery.prototype, 'criarUsuario').mockResolvedValue(mockUsuarioSalvo as any)
    jest.spyOn(EnderecoQuery.prototype, 'criarEndereco').mockResolvedValue({ id: 1 } as any)
    jest.spyOn(LoginQuery.prototype, 'criarLogin').mockResolvedValue({ id: 1 } as any)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Deve cadastrar usuário, endereço e login com sucesso", async () => {
    const resultado = await salvarUsuario(getMockUsuario())
    expect(resultado).toHaveProperty('id')       // retornou o usuário?
    expect(resultado).toHaveProperty('endereco')  // endereço foi atribuído?
    expect(resultado).toHaveProperty('login')     // login foi atribuído?
  })

  it("Deve criptografar a senha antes de salvar", async () => {
    await salvarUsuario(getMockUsuario())
    expect(CryptoJS.HmacSHA256).toHaveBeenCalled() // criptografia foi chamada?
  })

  it("Deve lançar erro se validação falhar", async () => {
    jest.spyOn(validacaoMiddleware, 'validarObjeto').mockReturnValue(['Campo nome obrigatório'])
    await expect(salvarUsuario(getMockUsuario())).rejects.toThrow('Campo nome obrigatório')
  })

  it("Deve lançar erro se o banco falhar", async () => {
    jest.spyOn(UsuarioQuery.prototype, 'criarUsuario').mockRejectedValue(new Error('Erro no banco'))
    await expect(salvarUsuario(getMockUsuario())).rejects.toThrow('Erro no banco')
  })

})