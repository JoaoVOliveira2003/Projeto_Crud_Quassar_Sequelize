import { comprovarLogin } from '../../services/login-service'
import { LoginQuery } from "../../schema/login-schema";
import { jest } from '@jest/globals'
process.env.CRYPTO_SECRET = 'chaveSecreta'

describe('comporvarLogin', () => {

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('Deve retornar um token for valido', async () => {
        const mockUsuario = [{
            id_usuario: 1,
            'usuario.id_tipo_usuario': 2,
        }]

        jest.spyOn(LoginQuery.prototype, 'realizarLogin').mockResolvedValueOnce(mockUsuario as any)

        const resultado = await comprovarLogin({
            email: '123@gmail.com',
            senha: '123'
        })

        expect(resultado).not.toBeNull
        expect(typeof resultado).toBe('string')
    })

    it('Deve retornar nulo quando for invalido.', async () => {

        jest.spyOn(LoginQuery.prototype, 'realizarLogin').mockResolvedValueOnce([] as any)

        const resultado = await comprovarLogin({
            email: '123@gmail.com',
            senha: '123'
        })

        expect(resultado).not.toBeNull
    })

    it('Deve lançar erro se o banco falhar', async () => {
        jest.spyOn(LoginQuery.prototype, 'realizarLogin').mockRejectedValue(new Error('Erro no banco'))
        await expect(comprovarLogin({
            email: '123@gmail.com',
            senha: '123'
        })).rejects.toThrow('Erro no banco')
    })
})