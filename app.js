const express = require("express");
const path = require("path");
const sequelize = require("./models").sequelize;
const routes = require("./routes");
const app = express();
const port = 3000;

/**
 * App middleware - It parses incoming requests with JSON payloads and is based on body-parser.
 */
app.use(express.json());
/**
 * App middleware - It parses incoming requests with urlencoded payloads and is based on body-parser.
 */
app.use(express.urlencoded({ extended: false }));

/**
 * @static - Serving static files.
 */
app.use("/static", express.static(path.join(__dirname, "/public")));

/**
 *@template - Sets application template engine.
 */
app.set("view engine", "pug");

/**
 * @listens - On client HTTP requests.
 */
app.use(routes);

/**
 * Page NOT FOUND handler
 */
app.use((req, res, next) => {
  const error = new Error("Page not found!");
  error.status = 404;
  next(error);
});

/**
 * Global error handler
 */
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status || 404);
    err.message = err.message;
    return res.render("page-not-found", { error: err });
  } else if (err.status === 500) {
    err.status(err.status || 500);
    err.message = err.message;
    res.render("error", { error: err });
  }
});

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Application runs on port: ${port}`));
});
