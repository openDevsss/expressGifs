module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tags = [
      { name: "memes" },
      { name: "anime" },
      { name: "entertainment" },
      { name: "animals" },
      { name: "nature" },
    ];

    await queryInterface.bulkInsert("Tags", tags, {});

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Удаляем созданные теги
    await queryInterface.bulkDelete("Tags", null, {});

    return Promise.resolve();
  },
};
