// Variables

const { Router } = require("express");
const router = Router();
const { AuthCheck, RoleCheck } = require("../middlewares/auth.checker");
const validate = require("../middlewares/validate");
const {
  createCtgSchema,
  updateCtgSchema,
} = require("../validation/ctg.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const CtgController = require("../controller/ctg.controller");

// Routes

router.patch(
  "/restore/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  CtgController.restore,
);

router.get(
  "/:id/products",
  validate(numericIdValidation, "params"),
  CtgController.getCtgProducts,
);
router.get("/", CtgController.getAll);
router.get(
  "/:id",
  validate(numericIdValidation, "params"),
  CtgController.getOne,
);

router.post(
  "/",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(createCtgSchema),
  CtgController.create,
);
router.put(
  "/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validate(numericIdValidation, "params"),
  validate(updateCtgSchema),
  CtgController.update,
);
router.delete(
  "/:id",
  validate(numericIdValidation, "params"),
  AuthCheck,
  RoleCheck(["admin"]),
  CtgController.delete,
);

module.exports = router;
