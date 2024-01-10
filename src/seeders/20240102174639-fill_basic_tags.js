module.exports = {
  up: async (queryInterface, Sequelize) => {
    const gifTags = [
      "funny",
      "cute",
      "animals",
      "memes",
      "reactions",
      "movies",
      "celebrities",
      "cartoons",
      "sports",
      "music",
      "dance",
      "celebrations",
      "technology",
      "science",
      "travel",
      "food",
      "nature",
      "gaming",
      "emotions",
      "art",
      "comedy",
      "fitness",
      "fashion",
      "nostalgia",
      "random",
      "mind-blowing",
      "adventure",
      "party",
      "space",
      "magic",
      "weather",
      "superhero",
      "vintage",
      "friends",
      "work",
      "relaxation",
      "inspiration",
      "creativity",
      "motivation",
    ];

    const tags = gifTags.map((tag) => ({ name: tag }));

    await queryInterface.bulkInsert("Tags", tags, {});

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Удаляем созданные теги
    await queryInterface.bulkDelete("Tags", null, {});

    return Promise.resolve();
  },
};
