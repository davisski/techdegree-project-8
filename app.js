const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();
const port = 3000;

app.use("/static", express.static(path.join(__dirname, "/public")));
app.set("view engine", "pug");
app.use(routes);
app.listen(port, () => console.log(`Application runs on port: ${port}`));
