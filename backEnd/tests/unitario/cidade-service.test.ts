import { getCidades } from '../../services/cidade-service.ts'
import { CidadeQuery } from '../../schema/cidade-shema.ts'
import { jest } from '@jest/globals'

describe('Listar cidades', () => {

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Deve retornar a lista de cidades', async () => {
    const mockCidades = [
      { id: 1, nome: 'Maringá' },
      { id: 2, nome: 'Londrina' },
      { id: 3, nome: 'Curitiba' },
    ] as any

    jest.spyOn(CidadeQuery.prototype, 'getTodasCidades').mockResolvedValue(mockCidades)

    const resultado = await getCidades()

    expect(resultado).toHaveLength(3)
    expect(resultado).toEqual(mockCidades)
  })

  it('Deve retornar lista vazia se não houver cidades', async () => {
    const mockCidades = [] as any

    jest.spyOn(CidadeQuery.prototype, 'getTodasCidades').mockResolvedValue(mockCidades)

    const resultado = await getCidades()

    expect(resultado).toHaveLength(0)
    expect(resultado).toEqual([])
  })

  it('Deve lançar erro se o banco falhar', async () => {
    jest.spyOn(CidadeQuery.prototype, 'getTodasCidades').mockRejectedValue(new Error('Erro no banco'))

    await expect(getCidades()).rejects.toThrow('Erro no banco')
  })

})