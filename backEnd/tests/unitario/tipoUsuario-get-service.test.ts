import { TipoUsuarioQuery } from "../../schema/tipoUsuario-schema";
import { getTodosTiposUsuario } from "../../services/tipoUsuario-get-service";
import { jest } from "@jest/globals";

describe("Ver todos tipos de usuarios", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Deve retornar os tipos de usuario', async () => {
    const mockTiposUsuarios = [
      { id: 1, nome: 'Adm' },
      { id: 2, nome: 'Normal' },
    ] as any;

    jest.spyOn(TipoUsuarioQuery.prototype, 'getTodosTiposUsuario').mockResolvedValue(mockTiposUsuarios);

    const resultado = await getTodosTiposUsuario();

    expect(resultado).toHaveLength(2);
    expect(resultado).toEqual(mockTiposUsuarios);
  });

  it('Deve retornar lista vazia se não houver tiposUsuarios', async () => {
    const mockCidades = [] as any

    jest.spyOn(TipoUsuarioQuery.prototype, 'getTodosTiposUsuario').mockResolvedValue(mockCidades)

    const resultado = await getTodosTiposUsuario()

    expect(resultado).toHaveLength(0)
    expect(resultado).toEqual([])
  })

  it('Deve lançar erro se o banco falhar', async () => {
    jest.spyOn(TipoUsuarioQuery.prototype, 'getTodosTiposUsuario').mockRejectedValue(new Error('Erro no banco'))

    await expect(getTodosTiposUsuario()).rejects.toThrow('Erro no banco')
  })

});