import { Sequelize } from "sequelize";
export const conecta = new Sequelize("testes", "postgres", "senha", {
  host: "localhost",
  dialect: "postgres",
  logging: false,

  // logging: (sql, queryObject) => {
  //   console.log("SQL:", sql);
  //   console.log("PARAMS:", queryObject.bind);
  // },
});
