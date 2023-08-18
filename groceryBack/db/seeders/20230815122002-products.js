'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      {
        name: 'Doritos',
        price: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Banana',
        price: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Apple',
        price: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Iphone',
        price: 11500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cheese',
        price: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  },
};
