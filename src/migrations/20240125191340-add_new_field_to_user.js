const table = "Users";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(table, "phone", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn(table, "fullName", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn(table, "lastName", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn(table, "location", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn(table, "bio", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(table, "phone");
    await queryInterface.removeColumn(table, "fullName");
    await queryInterface.removeColumn(table, "lastName");
    await queryInterface.removeColumn(table, "location");
    await queryInterface.removeColumn(table, "bio");
  },
};
