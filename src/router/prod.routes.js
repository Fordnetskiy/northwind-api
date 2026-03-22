// Variables

const { Router } = require("express");
const router = Router();
const {
  AuthCheck,
  RoleCheck,
  OwnerCheck,
} = require("../middlewares/auth.checker");
const {
  createProdSchema,
  updateProdSchema,
} = require("../validation/prod.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const validate = require("../middlewares/validate");
const ProdController = require("../controller/prod.controller");

// Routes

router.post(
  "/",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(createProdSchema),
  ProdController.createOne,
);

router.get("/", ProdController.getAll);

router.get(
  "/stats",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  ProdController.stats,
);

router.get(
  "/:id",
  validate(numericIdValidation, "params"),
  ProdController.getOne,
);

router.put(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  validate(updateProdSchema),
  ProdController.update,
);

router.delete(
  "/:id",
  AuthCheck,
  RoleCheck(["admin", "employee"]),
  validate(numericIdValidation, "params"),
  ProdController.delete,
);

module.exports = router;
