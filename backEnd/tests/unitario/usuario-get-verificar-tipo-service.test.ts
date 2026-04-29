import { UsuarioQuery } from "../../schema/usuario-schema";
import {getVerificarTipoUsuario} from "../../services/usuario-get-verificar-tipo-service"
import { jest } from '@jest/globals'

describe('Verificar se o tipo do usuario no token é igual ao do banco', () => {
   const mockDados = {
      id_usuario:1,
      id_tipo_usuario:2
   }

   beforeEach(()=>{
      jest.spyOn(UsuarioQuery.prototype, 'verificarTipoUsuario').mockResolvedValue(true as any)
   })

   afterEach(() => {
      jest.clearAllMocks()
   })

   it('Deve retornar true se o usuario for do tipo correto',async () =>{
      const resultado = await getVerificarTipoUsuario(mockDados);
      expect (resultado).toBe(true);
   })

   it('Deve retornar false se o usuario não for do tipo correto', async () => {
      jest.spyOn(UsuarioQuery.prototype, 'verificarTipoUsuario').mockResolvedValue(false as any)
      const resultado = await getVerificarTipoUsuario(mockDados)
      expect(resultado).toBe(false)
   })

   it('Deve lançar erro se o banco falhar', async () => {
      jest.spyOn(UsuarioQuery.prototype, 'verificarTipoUsuario').mockRejectedValue(new Error('Erro no banco'))
      await expect(getVerificarTipoUsuario(mockDados)).rejects.toThrow('Erro no banco')
   })

})