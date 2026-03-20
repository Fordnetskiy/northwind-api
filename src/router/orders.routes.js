// Variables

const { Router } = require("express");
const router = Router();
const {
  AuthCheck,
  RoleCheck,
  OwnerCheck,
} = require("../middlewares/auth.checker");
const validate = require("../middlewares/validate");
const {
  createOrderSchema,
  updateOrderSchema,
} = require("../validation/orders.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const OrderController = require("../controller/orders.controller");

// Admin / Employee Routes

router.post(
  "/",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(createOrderSchema),
  OrderController.create,
);

router.get(
  "/",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  OrderController.getAll,
);
router.get(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  OrderController.getOne,
);

router.put(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  validate(updateOrderSchema),
  OrderController.updateOrder,
);

router.delete(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  OrderController.deleteOrder,
);

// Customer Order Routes

router.post(
  "/my",
  AuthCheck,
  validate(createOrderSchema),
  OrderController.myOrderCreate,
);

router.get("/my", AuthCheck, OrderController.myOrders);
router.get(
  "/my/order/:id",
  AuthCheck,
  validate(numericIdValidation, "params"),
  OrderController.myOrder,
);

router.put(
  "/my/order/:id",
  AuthCheck,
  validate(numericIdValidation, "params"),
  validate(updateOrderSchema),
  OrderController.updateMyOrder,
);

router.delete(
  "/my/order/:id",
  AuthCheck,
  validate(numericIdValidation, "params"),
  OrderController.deleteMyOrder,
);

module.exports = router;
