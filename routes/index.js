const express = require("express");
const Books = require("../models").Book;
const router = express.Router();

const asyncHandler = (cb) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      res.status(500).send(error);
    }
  };
};

router.get("/", (req, res) => {
  res.redirect("/books");
});

router.get(
  "/books",
  asyncHandler(async (req, res) => {
    const books = await Books.findAll();
    if (books) {
      res.render("index", { books, title: "Books" });
    } else {
      res.redirect("/books/new");
    }
  })
);

router.get("/books/new", (req, res) => {
  res.render("new-book");
});

router.post(
  "/books/new",
  asyncHandler(async (req, res) => {
    const book = await Books.create(req.body);
    res.redirect(`/books/${book.id}`);
  })
);

router.get(
  "/books/:id",
  asyncHandler(async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    res.render("update-book", { book, title: "Update book" });
  })
);

router.post(
  "/books/:id",
  asyncHandler(async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    await book.update(req.body);
    res.redirect(`/books`);
  })
);

router.post(
  "/books/:id/delete",
  asyncHandler(async (req, res) => {
    const book = await Books.findByPk(req.params.id);
    await book.destroy();
    res.redirect("/books");
  })
);

module.exports = router;
