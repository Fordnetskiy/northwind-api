const { Router } = require("express");
const route = Router();
const productRoutes = require("./prod.routes");
const supplierRoutes = require("./supp.routes");
const orderRoutes = require("./orders.routes");
const shipperRoutes = require("./shipp.routes");

route.use("/orders", shipperRoutes);
route.use("/products", productRoutes);
route.use("/suppliers", supplierRoutes);
route.use("/shippers", orderRoutes);

module.exports = route;
