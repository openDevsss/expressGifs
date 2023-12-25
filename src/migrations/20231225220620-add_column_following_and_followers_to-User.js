const TABLE_NAME = "Users";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE_NAME, "following", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn(TABLE_NAME, "followers", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE_NAME, "following");
    await queryInterface.removeColumn(TABLE_NAME, "followers");
  },
};
