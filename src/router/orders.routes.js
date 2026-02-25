const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const OrderController = require("../controller/orders.controller");

router.post("/", OrderController.create);
router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getOne);
router.put("/:id", OrderController.updateOrder);

module.exports = router;
