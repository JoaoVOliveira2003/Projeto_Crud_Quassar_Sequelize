import { EnderecoQuery } from "../../schema/endereco-schema";
import { LoginQuery } from "../../schema/login-schema";
import { UsuarioQuery } from "../../schema/usuario-schema";
import { deletarUsuarioService } from "../../services/usuario-deletar-service";
import { jest } from "@jest/globals";

describe("testar a deletação de usuarios", () => {

   //"Quando alguém chamar o método deletar ,não execute o código real — retorne 1 diretamente."
   beforeEach(() => {
      jest.spyOn(EnderecoQuery.prototype, 'deletarEndereco').mockResolvedValue(1 as any);
      jest.spyOn(LoginQuery.prototype, 'deletarLogin').mockResolvedValue(1 as any);
      jest.spyOn(UsuarioQuery.prototype, 'deletarUsuario').mockResolvedValue(1 as any);
   })

   it("Deve apagar o usuario", async () => {
      const resultado = await deletarUsuarioService(1);
      expect(resultado).toEqual({ mensagem: "Usuário deletado com sucesso" });
   });

   it("Deve lançar erro se o banco falhar",async()=>{
      jest.spyOn(EnderecoQuery.prototype,'deletarEndereco').mockRejectedValue(new Error)
      await expect(deletarUsuarioService(1)).rejects.toThrow("");
   })
})
