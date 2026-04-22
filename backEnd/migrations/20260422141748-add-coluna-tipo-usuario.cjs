'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios',
      'id_tipo_usuario',{
        type:Sequelize.INTEGER, allowNull:true,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuario','id_tipo_usuario');
  }
};
