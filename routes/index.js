const express = require("express");
const Books = require("../models").Book;
const { Op } = require("sequelize");
const router = express.Router();

const per_page = 2;

/**
 * @function {createError} - Creates and return error object.
 */
const createError = () => {
  const err = new Error(`Page not found!`);
  err.status = 404;
  return err;
};
/**
 * @function {asyncHandler} - Handles route try catch statement.
 * @param {cb} - Callback function
 */
const asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
};
/**
 * @method {get} - GET route for '/'
 * Route redirects to path="/books"
 */
router.get("/", (req, res) => {
  res.redirect("/books");
});

/**
 * @method {get} - GET route for '/books'
 * Route get from database all stored records.
 * Checks if have query and then base one query, finds records matching query criteria and renders to index page
 */
router.get(
  "/books",
  asyncHandler(async (req, res, next) => {
    const { count, rows } = await Books.findAndCountAll({ limit: per_page });
    const links = Math.round(count / per_page);

    // checks for query
    if (req.query.query != undefined) {
      const { count, rows } = await Books.findAndCountAll({
        where: {
          [Op.or]: {
            title: {
              [Op.like]: `%${req.query.query}%`,
            },
            author: {
              [Op.like]: `%${req.query.query}%`,
            },
            genre: {
              [Op.like]: `%${req.query.query}%`,
            },
            year: {
              [Op.eq]: `${req.query.query}`,
            },
          },
        },
        offset: per_page * req.query.page - per_page,
        limit: per_page,
      });

      const links = Math.round(count / per_page);
      const url = req.url;
      const activePage = req.query.page;
      // checks if page requested has bigger than actual page links and then base on if condition execute statement.
      if (req.query.page > links) {
        const err = createError();
        next(err);
      } else {
        return res.render("index", {
          books: rows,
          title: "Search results",
          links,
          url,
          activePage,
        });
      }
    } else {
      const activePage = 1;
      res.render("index", { books: rows, title: "Books", links, activePage });
    }
  })
);
/**
 * @method {get} - GET route for '/books/page/:page' get books by requested page
 */
router.get(
  "/books/page/:page",
  asyncHandler(async (req, res, next) => {
    const { count, rows } = await Books.findAndCountAll({
      offset: per_page * req.params.page - per_page,
      limit: per_page,
    });
    const links = Math.round(count / per_page);
    const activePage = req.params.page;
    if (req.params.page > links) {
      const err = createError();
      next(err);
    } else {
      res.render("index", { books: rows, title: "Books", links, activePage });
    }
  })
);
/**
 * @method {get} - GET route for '/books/new' to get create book form.
 */
router.get("/books/new", (req, res) => {
  res.render("new-book");
});

/**
 * @method {post} - POST route for '/books/new' to post a new book if there is not validation error.
 */
router.post(
  "/books/new",
  asyncHandler(async (req, res) => {
    try {
      const book = await Books.create(req.body);
      return res.redirect(`/books/${book.id}`);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.render(`new-book`, { errors: error.errors });
      }
    }
  })
);

/**
 * @method {get} - GET route for '/book/:id' - individual book.
 */
router.get(
  "/books/:id",
  asyncHandler(async (req, res, next) => {
    const book = await Books.findByPk(req.params.id);
    if (book) {
      res.render("update-book", { book, title: "Update book" });
    } else {
      const err = createError();
      next(err);
    }
  })
);

/**
 * @method {post} - POST route for '/book/:id' - to update book.
 */
router.post(
  "/books/:id",
  asyncHandler(async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect(`/books`);
  })
);

/**
 * @method {post} - POST route for '/book/:id/delete' - to delete book by id.
 */
router.post(
  "/books/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/books");
  })
);

/**
 * @method {get} - GET * routes that doesn't exist.
 */
router.get("*", (req, res, next) => {
  const err = createError();
  next(err);
});
module.exports = router;
