const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/books");
});

router.get("/books", (req, res) => {
  res.render("index");
});

router.get("/books/new", (req, res) => {
  res.render("new");
});

router.post("/books/new", (req, res) => {
  res.redirect("/books");
});

router.get("/books/:id", (req, res) => {
  res.render("book");
});

router.post("/books/:id", (req, res) => {
  res.redirect("/books");
});

router.post("/books/:id/delete", (req, res) => {});

module.exports = router;
