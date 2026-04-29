import { UsuarioQuery } from "../../schema/usuario-schema";
import { getVerificarTipoUsuario } from "../../services/usuario-get-verificar-tipo-service"
import { jest } from '@jest/globals'

describe('Trazer o tipo de usuario e seu id, para colocar no token', () => {
   const mockDados = {
      id_usuario: 1,
      id_tipo_usuario: 2
   }

   beforeEach(() => {
      jest.spyOn(UsuarioQuery.prototype, 'verificarTipoUsuario').mockResolvedValue(true as any)
   })

   it('Deve retornar true quando o usuario possui o tipo informado', async () => {
      const resultado = await getVerificarTipoUsuario(mockDados);
      expect(resultado).toBe(true);
   })

   it('deve retornar false quando o usuário não possui o tipo informado', async () => {
      jest.spyOn(UsuarioQuery.prototype, 'verificarTipoUsuario').mockResolvedValue(false as any);
      const resultado = await getVerificarTipoUsuario(mockDados);
      expect(resultado).toBe(false);
   });

   it('deve propagar o erro quando verificarTipoUsuario lançar uma exceção', async () => {
    const erroEsperado = new Error('Erro no banco de dados');
    jest.spyOn(UsuarioQuery.prototype, 'verificarTipoUsuario').mockRejectedValue(erroEsperado);
    await expect(getVerificarTipoUsuario(mockDados)).rejects.toThrow('Erro no banco de dados');
  });

})