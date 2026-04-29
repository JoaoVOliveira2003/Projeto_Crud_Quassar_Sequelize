import { getCidades } from "../../services/cidade-service";
import { conecta } from "../../config/conecta";

describe('getCidades - integração',()=>{
    afterAll(async () =>{
        await conecta.close()
    });

    it('Deve retornar lista de dados no banco real', async () =>{
        const resultado = await getCidades();
        expect(resultado.length).toBeGreaterThan(0)
    });

    it('Deve retornar objetos dos nomes.',async () =>{
        const resultado = await getCidades();
        expect(resultado[0]).toHaveProperty('cod_cidade');
        expect(resultado[0]).toHaveProperty('desc_cidade');
        expect(resultado[0]).toHaveProperty('createdAt');
        expect(resultado[0]).toHaveProperty('updatedAt');
    });
})