const TABLE_NAME = "Gifs";
const COLUMN_NAME = "viewers";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(TABLE_NAME, COLUMN_NAME, {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(TABLE_NAME, COLUMN_NAME);
  },
};
