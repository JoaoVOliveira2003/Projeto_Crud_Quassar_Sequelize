import { Request, Response } from "express";
import { getCidades as getCidade} from "../services/cidadeService" ;
export module cidadeController {
  
  export async function getCidades(req, res) {
    const cidades = await getCidade();
    res.json(cidades);
  }
}
