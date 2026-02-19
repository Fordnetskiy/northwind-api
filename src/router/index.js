const { Router } = require("express");
const route = Router();
const productRoutes = require("./prod.routes");
const supplierRoutes = require("./supp.routes");

route.use("/products", productRoutes);
route.use("/suppliers", supplierRoutes);

module.exports = route;
