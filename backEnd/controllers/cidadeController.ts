import { Request, Response } from "express";
import { getCidades as getCidade} from "../services/cidade-service" ;
//versões antigas usavam module, agora é namespace
export namespace  cidadeController{ 
  
  export async function getCidades(_req: Request, res: Response) {
    const cidades = await getCidade();
    res.json(cidades);
  }

}

