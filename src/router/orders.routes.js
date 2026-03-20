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

// Create
router.post(
  "/",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(createOrderSchema),
  OrderController.create,
);
router.post(
  "/my",
  AuthCheck,
  RoleCheck(["customer"]),
  validate(createOrderSchema),
  OrderController.myOrderCreate,
);

// Read
router.get(
  "/",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  OrderController.getAll,
);
router.get("/my", AuthCheck, RoleCheck(["customer"]), OrderController.myOrders);

router.get(
  "/my/:id",
  AuthCheck,
  RoleCheck(["customer"]),
  validate(numericIdValidation, "params"),
  OrderController.myOrder,
);
router.get(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  OrderController.getOne,
);

// Update
router.put(
  "/my/:id",
  AuthCheck,
  RoleCheck(["customer"]),
  validate(numericIdValidation, "params"),
  validate(updateOrderSchema),
  OrderController.updateMyOrder,
);
router.put(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  validate(updateOrderSchema),
  OrderController.updateOrder,
);

// Delete
router.delete(
  "/my/:id",
  AuthCheck,
  RoleCheck(["customer"]),
  validate(numericIdValidation, "params"),
  OrderController.deleteMyOrder,
);
router.delete(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  OrderController.deleteOrder,
);

module.exports = router;
