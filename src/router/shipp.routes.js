// Variables

const { Router } = require("express");
const router = Router();
const { AuthCheck, RoleCheck } = require("../middlewares/auth.checker");
const validate = require("../middlewares/validate");
const {
  createShipperSchema,
  updateShipperSchema,
} = require("../validation/shipp.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const ShippController = require("../controller/shipp.controller");

// Routes

router.post(
  "/",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(createShipperSchema),
  ShippController.createShipper,
);

router.get(
  "/",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  ShippController.getAll,
);

router.patch(
  "/restore/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(numericIdValidation, "params"),
  ShippController.restoreShipper,
);

router.get(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  ShippController.getOne,
);

router.put(
  "/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(numericIdValidation, "params"),
  validate(updateShipperSchema),
  ShippController.updateShipper,
);

router.delete(
  "/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(numericIdValidation, "params"),
  ShippController.deleteShipper,
);

module.exports = router;
