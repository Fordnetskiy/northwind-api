// Variables

const { Router } = require("express");
const route = Router();
const authRoutes = require("./auth.routes");
const customerRoutes = require("./cust.routes");
const employeeRoutes = require("./empl.routes");
const orderRoutes = require("./orders.routes");
const productRoutes = require("./prod.routes");
const shipperRoutes = require("./shipp.routes");
const supplierRoutes = require("./supp.routes");

// Main resources

route.use("/auth", authRoutes);
route.use("/customers", customerRoutes);
route.use("/employees", employeeRoutes);
route.use("/orders", orderRoutes);
route.use("/products", productRoutes);
route.use("/shippers", shipperRoutes);
route.use("/suppliers", supplierRoutes);

module.exports = route;
