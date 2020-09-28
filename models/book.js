const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init({
    title: {
      type: Sequelize.STRING,
      validate: {
        notNull: {
          msg: "Please provide book title",
        },
        notEmpty: {
          msg: "Please provide book title",
        },
      },
    },
    author: {
      type: Sequelize.STRING,
      validate: {
        notNull: {
          msg: "Please provide book author",
        },
        notEmpty: {
          msg: "Please provide book author",
        },
      },
    },
    genre: {
      type: Sequelize.STRING,
    },
    year: {
      type: Sequelize.NUMBER,
    },
  });
  return Book;
};
