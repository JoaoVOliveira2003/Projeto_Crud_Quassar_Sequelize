import { Sequelize } from "sequelize";
export const conecta = new Sequelize('testes','postgres','senha',{host:'localhost',dialect:'postgres'})