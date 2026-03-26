"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Cidades", [
      {
        desc_cidade: "Curitiba",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_cidade: "Colombo",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        desc_cidade: "São José",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {},
};
