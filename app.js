const express = require("express");
const dotenv = require("dotenv").config();
const routes = require("./src/router/index");
const errorHandler = require("./src/middlewares/gErrHandler");

const app = express();

app.use(express.json());
app.use("api/v1", routes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serever is running on PORT - ${PORT}`);
});
