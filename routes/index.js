const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/create_book", (req, res) => {
  res.render("add");
});

router.get("/book", (req, res) => {
  res.render("book");
});

module.exports = router;
