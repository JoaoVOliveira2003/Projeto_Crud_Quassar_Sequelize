import { UsuarioQuery } from "../../schema/usuario-schema";
import { getTodosUsuariosFiltrados } from "../../services/usuario-get-filtrado-service";
import { jest } from "@jest/globals";

describe('Testar usuario filtrado',()=>{
   const mockFiltros ={
      nome:"Joao",
      tipoUsuario:1
   } as any;

   const mockUsuarios = [
      { id: 1, nome: "João Silva" ,tipoUsuario:2},
      { id: 3, nome: "Leticia Padro" ,tipoUsuario:2},
      { id: 2, nome: "João Pedro" ,tipoUsuario:1},
   ] as any;

   beforeEach(()=>{
      jest.spyOn(UsuarioQuery.prototype,'getUsuariosFiltrados').mockResolvedValue(mockUsuarios)
   })

   afterEach(()=>{
      jest.clearAllMocks();
   })

   it("Deve retornar filtrada",async()=>{
      const resultado = await getTodosUsuariosFiltrados(mockFiltros)
      expect(resultado).toEqual(mockUsuarios);
   })

   it("Deve retornar lista vazia se n achar ninguem",async()=>{
      jest.spyOn(UsuarioQuery.prototype,'getUsuariosFiltrados').mockResolvedValue([]);
      const resultado = await getTodosUsuariosFiltrados(mockFiltros)
      expect(resultado).toHaveLength(0)
   })

   it("Deve lançar erro se o banco falhar", async () => {
      jest.spyOn(UsuarioQuery.prototype, 'getUsuariosFiltrados').mockRejectedValue(new Error("Erro no banco"));
      await expect(getTodosUsuariosFiltrados(mockFiltros)).rejects.toThrow("Erro no banco");
   });


})
