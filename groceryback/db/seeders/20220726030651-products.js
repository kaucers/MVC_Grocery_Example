"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("products", [
      {
        name: "Doritos",
        price: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Banana",
        price: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Apple",
        price: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Iphone",
        price: 11500,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Cheese",
        price: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("products", null, {});
  },
};
