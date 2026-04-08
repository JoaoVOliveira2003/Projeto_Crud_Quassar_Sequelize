import {regras} from './regras';

type listaErros = string[];

export function validarObjeto(objeto): listaErros{
    const erros: listaErros = [];

    function percorrer(obj,caminho:string[] = []){
        for (const chave of Object.keys(obj)){
            const valor = obj[chave];
            const caminhoCompleto = [...caminho,chave];

            if(valor !== null && typeof valor ==='object' && !Array.isArray(valor)){
                percorrer(valor,caminhoCompleto);
                continue;
            }

            const regrasDoCampo = regras[chave];

            if(regrasDoCampo){
                for(const regra of regrasDoCampo){
                    const resultado = regra.length === 2 ? regra(valor,objeto) : regra(valor);

                    if(resultado !== true){
                    erros.push(`${caminhoCompleto.join('.')} → ${resultado}`);
                    break;

                    }
                }
            }
        }
    }

    percorrer(objeto);
    return erros;
}