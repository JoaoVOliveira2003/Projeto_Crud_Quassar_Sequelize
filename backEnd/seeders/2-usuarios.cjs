"use strict";
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const lista_dados = [];

    for (let i = 0; i < 5; i++) {
      lista_dados.push({
        nome: faker.person.firstName(),
        dataDeNascimento: faker.date.birthdate({
          min: 18,
          max: 60,
          mode: "age",
        }),
        peso: faker.number.float({
          min: 50,
          max: 120,
          precision: 0.1,
        }),
        altura: faker.number.float({
          min: 1.5,
          max: 2.0,
          precision: 0.01,
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Usuarios", lista_dados);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
