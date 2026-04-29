import { UsuarioQuery } from "../../schema/usuario-schema";
import { EnderecoQuery } from "../../schema/endereco-schema";
import { LoginQuery } from "../../schema/login-schema";
import { atualizarUsuarioService } from "../../services/usuario-atualizar-service";
import { jest } from "@jest/globals";
import * as validacaoMiddleware from "../../middleware/validacao/validacao-middleware";
import CryptoJS from "crypto-js";

process.env.CRYPTO_SECRET = 'chaveSecreta'

let cryptoSpy: any;

describe("Testar a atualização de usuario", () => {

   const mockUsuario = {
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
   } as any;

   const getMockUsuario = () => ({ ...mockUsuario, login: { ...mockUsuario.login } });

   beforeEach(() => {
      jest.spyOn(validacaoMiddleware, 'validarObjeto').mockReturnValue([]);
      cryptoSpy = jest.spyOn(CryptoJS, 'HmacSHA256').mockReturnValue({ toString: () => "hash_mocado" } as any);
      jest.spyOn(EnderecoQuery.prototype, 'atualizarEndereco').mockResolvedValue(1 as any);
      jest.spyOn(LoginQuery.prototype, 'atualizarLogin').mockResolvedValue(1 as any);
      jest.spyOn(UsuarioQuery.prototype, 'atualizarUsuario').mockResolvedValue(1 as any);
   });

   afterEach(() => {
      jest.clearAllMocks();
   });

   it("Deve atualizar um cadastro de usuario, endereco e login", async () => {
      const resultado = await atualizarUsuarioService(1, getMockUsuario());
      expect(resultado).toEqual({ mensagem: "Usuario e endereco atualizado" });
   });

   it("Deve lançar erro se validação errar", async () => {
      jest.spyOn(validacaoMiddleware, 'validarObjeto').mockReturnValue(["Nome é obrigatorio"]);
      await expect(atualizarUsuarioService(1, getMockUsuario())).rejects.toThrow("Nome é obrigatorio");
   });

   it("Deve criptografar a senha antes de salvar", async () => {
      await atualizarUsuarioService(1, getMockUsuario());
      expect(cryptoSpy).toHaveBeenCalledWith("senha123", "chaveSecreta");
   });

});