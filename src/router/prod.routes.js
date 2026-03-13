// Variables

const { Router } = require("express");
const router = Router();
const {
  createProdSchema,
  updateProdSchema,
} = require("../validation/prod.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const validate = require("../middlewares/validate");
const ProdController = require("../controller/prod.controller");

// Routes

router.get("/stats", ProdController.stats);

router.post("/", validate(createProdSchema), ProdController.createOne);

router.get("/", ProdController.getAll);
router.get(
  "/:id",
  validate(numericIdValidation, "params"),
  ProdController.getOne,
);

router.put(
  "/:id",
  validate(numericIdValidation, "params"),
  validate(updateProdSchema),
  ProdController.update,
);

router.delete(
  "/:id",
  validate(numericIdValidation, "params"),
  ProdController.delete,
);

module.exports = router;
