const { Router } = require("express");
const route = Router();
const productRoutes = require("./prod.routes");

route.use("/products", productRoutes);

module.exports = route;
