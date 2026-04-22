import { CidadeQuery } from "../schema/cidade-shema.ts";

export async function getCidades(
  cidadeQuery = new CidadeQuery()
) {
  const cidades = await cidadeQuery.getTodasCidades();
  return cidades;
}