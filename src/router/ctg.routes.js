// Variables

const { Router } = require("express");
const router = Router();
const { AuthCheck, RoleCheck } = require("../middlewares/auth.checker");
const validate = require("../middlewares/validate");
const {
  createCtgSchema,
  updateCtgSchema,
} = require("../validation/ctg.schema");
const CtgController = require("../controller/ctg.controller");

// Routes

router.get("/:id/products", CtgController.getCtgProducts);
router.get("/", CtgController.getAll);
router.get("/:id", CtgController.getOne);

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
  validate(updateCtgSchema),
  CtgController.update,
);
router.delete("/:id", AuthCheck, RoleCheck(["admin"]), CtgController.delete);

module.exports = router;
