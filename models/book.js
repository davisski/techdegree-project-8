const Sequelize = require("sequelize");

/**
 * @extends {Book} - Extends Sequelize Model with all properties to it, and implemented validation for title and author.
 *
 */
module.exports = (sequelize) => {
  class Book extends Sequelize.Model {}
  Book.init(
    {
      title: {
        type: Sequelize.STRING,
        allowNull: false,
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
        allowNull: false,
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
    },
    { sequelize }
  );
  return Book;
};
