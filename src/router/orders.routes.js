const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const {
  createOrderSchema,
  updateOrderSchema,
} = require("../validation/orders.schema");
const OrderController = require("../controller/orders.controller");

router.post("/", validade(createOrderSchema), OrderController.create);
router.get("/", OrderController.getAll);
router.get("/:id", OrderController.getOne);
router.put("/:id", validade(updateOrderSchema), OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
