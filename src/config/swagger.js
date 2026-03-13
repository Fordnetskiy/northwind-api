const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Northwind API",
      description: "REST API for Northwind DB",
      version: "1.1.0",
    },
  },
  apis: [path.join(__dirname, "../docs/*.js")],
};

module.exports = swaggerJsdoc(options);
