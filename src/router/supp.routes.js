// Variables

const { Router } = require("express");
const router = Router();
const { AuthCheck, RoleCheck } = require("../middlewares/auth.checker");
const validate = require("../middlewares/validate");
const {
  createSuppSchema,
  updateSuppSchema,
} = require("../validation/supp.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const SuppController = require("../controller/supp.controller");

// Routes

router.post(
  "/",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(createSuppSchema),
  SuppController.create,
);

router.get(
  "/",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  SuppController.getAll,
);

router.patch(
  "/restore/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(numericIdValidation, "params"),
  SuppController.restore,
);

router.get(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  SuppController.getOne,
);

router.put(
  "/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(numericIdValidation, "params"),
  validate(updateSuppSchema),
  SuppController.updateOne,
);

router.delete(
  "/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(numericIdValidation, "params"),
  SuppController.delete,
);

module.exports = router;
