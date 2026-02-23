const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const OrderController = require("../controller/orders.controller");

module.exports = router;
