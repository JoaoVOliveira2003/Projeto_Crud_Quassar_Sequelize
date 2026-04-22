'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tipo_usuario', {
      id_tipo_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true, // ← não esquece disso
        allowNull: false,
        // ← remove o references daqui
      },
      desc_tipo_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Tipo_usuario');
  }
};