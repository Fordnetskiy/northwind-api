require("dotenv").config();
const express = require("express");
const morgan = require("./src/middlewares/morgan");
const logger = require("./src/config/logger");
const routes = require("./src/router/index");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");
const errorHandler = require("./src/middlewares/gErrHandler");

const app = express();

app.use(morgan);
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
  logger.info(`Server is running on PORT - ${PORT}`);
});
