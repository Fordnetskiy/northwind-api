// Variables

const { Router } = require("express");
const router = Router();
const {
  AuthCheck,
  RoleCheck,
  OwnerCheck,
} = require("../middlewares/auth.checker");
const validate = require("../middlewares/validate");
const { createEmployee, updateEmployee } = require("../validation/empl.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const EmplController = require("../controller/empl.controller");

// Routes

router.post(
  "/",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(createEmployee),
  EmplController.createEmployee,
);

router.get(
  "/",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  EmplController.getAll,
);

router.patch(
  "/restore/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(numericIdValidation, "params"),
  EmplController.restoreEmployee,
);

router.get(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  EmplController.getOne,
);

router.put(
  "/:id",
  AuthCheck,
  validate(numericIdValidation, "params"),
  OwnerCheck,
  validate(updateEmployee),
  EmplController.updateEmployee,
);

router.delete(
  "/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(numericIdValidation, "params"),
  EmplController.deleteEmployee,
);

router.get(
  "/:id/orders",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  EmplController.empOrders,
);

module.exports = router;
