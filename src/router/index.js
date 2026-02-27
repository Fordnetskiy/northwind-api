const { Router } = require("express");
const route = Router();
const productRoutes = require("./prod.routes");
const supplierRoutes = require("./supp.routes");
const orderRoutes = require("./orders.routes");
const shipperRoutes = require("./shipp.routes");
const employeeRoutes = require("./empl.routes");

route.use("/orders", orderRoutes);
route.use("/products", productRoutes);
route.use("/employees", employeeRoutes);
route.use("/suppliers", supplierRoutes);
route.use("/shippers", shipperRoutes);

module.exports = route;
