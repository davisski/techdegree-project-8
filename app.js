const express = require("express");
const path = require("path");
const sequelize = require("./models").sequelize;
const routes = require("./routes");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static(path.join(__dirname, "/public")));
app.set("view engine", "pug");
app.use(routes);

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Application runs on port: ${port}`));
});
