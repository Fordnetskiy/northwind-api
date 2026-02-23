const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const OrderController = require("../controller/orders.controller");

router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getOne);

module.exports = router;
