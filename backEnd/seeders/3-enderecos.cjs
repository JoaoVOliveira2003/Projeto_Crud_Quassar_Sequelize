"use strict";
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const lista_dados = [];

    for (let i = 0; i < 5; i++) {
      lista_dados.push({
        rua: faker.location.street(),
        numero: faker.number.int({ min: 1, max: 9999 }),
        cod_cidade: faker.number.int({ min: 1, max: 3 }),
        id_usuario: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert("Enderecos", lista_dados);
  },

  async down(queryInterface, Sequelize) {
  },
};
