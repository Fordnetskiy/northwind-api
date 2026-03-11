require("dotenv").config();

const express = require("express");
const routes = require("./src/router/index");
const errorHandler = require("./src/middlewares/gErrHandler");

const app = express();

app.use(express.json());
app.use("/api/v1", routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route: ${req.method} - ${req.baseUrl}${req.url} not found!`,
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT - ${PORT}`);
});
