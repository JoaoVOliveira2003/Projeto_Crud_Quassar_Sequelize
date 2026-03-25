import { Sequelize } from "sequelize";
export const sequelize = new Sequelize('testes','postgres','senha',{host:'localhost',dialect:'postgres'})