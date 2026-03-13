// Variables

const { Router } = require("express");
const router = Router();
const validate = require("../middlewares/validate");
const {
  createOrderSchema,
  updateOrderSchema,
} = require("../validation/orders.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const OrderController = require("../controller/orders.controller");

// Routes

router.post("/", validate(createOrderSchema), OrderController.create);

router.get("/", OrderController.getAll);
router.get(
  "/:id",
  validate(numericIdValidation, "params"),
  OrderController.getOne,
);

router.put(
  "/:id",
  validate(numericIdValidation, "params"),
  validate(updateOrderSchema),
  OrderController.updateOrder,
);

router.delete(
  "/:id",
  validate(numericIdValidation, "params"),
  OrderController.deleteOrder,
);

module.exports = router;
