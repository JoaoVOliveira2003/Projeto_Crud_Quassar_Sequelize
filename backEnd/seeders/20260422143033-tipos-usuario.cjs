'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tipo_usuario', [
      { desc_tipo_usuario: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { desc_tipo_usuario: 'comum', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tipo_usuario', null, {});
  }
};