const { Router } = require("express");
const route = Router();
const productRoutes = require("./prod.routes");
const supplierRoutes = require("./supp.routes");
const orderRoutes = require("./orders.routes");

route.use("/products", productRoutes);
route.use("/suppliers", supplierRoutes);
route.use("/orders", orderRoutes);

module.exports = route;
