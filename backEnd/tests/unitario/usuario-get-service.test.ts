import { UsuarioQuery } from "../../schema/usuario-schema";
import { getTodosUsuarios } from "../../services/usuario-get-service";
import { jest } from '@jest/globals'

describe('Listar todos os usuarios', () => {

   const mockUsuarios = [
      { nome: 'Jose' },
      { nome: 'Maria' },
      { nome: 'Claudio' },
   ] as any;

   beforeEach(() => {
      jest.spyOn(UsuarioQuery.prototype, 'getUsuarios').mockResolvedValue(mockUsuarios)
   })

   afterEach(() => {
      jest.clearAllMocks()
   })

   it('Deve listar todos usuarios', async () => {
      const usuarios = await getTodosUsuarios();
      expect(usuarios).toHaveLength(3)
      expect(usuarios).toEqual(mockUsuarios)
   })

   it('Deve retornar lista vazia se não houver usuarios', async () => {
      jest.spyOn(UsuarioQuery.prototype, 'getUsuarios').mockResolvedValue([])
      const usuarios = await getTodosUsuarios();
      expect(usuarios).toHaveLength(0)
   })

   it('Deve lançar erro se o banco falhar', async () => {
      jest.spyOn(UsuarioQuery.prototype, 'getUsuarios').mockRejectedValue(new Error('Erro no banco'))
      await expect(getTodosUsuarios()).rejects.toThrow('Erro no banco')
   })

})