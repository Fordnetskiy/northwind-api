const { Router } = require("express");
const router = Router();
const validate = require("../middlewares/validate");
const {
  createSuppSchema,
  updateSuppSchema,
} = require("../validation/supp.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const SuppController = require("../controller/supp.controller");

router.post("/", validate(createSuppSchema), SuppController.create);

router.get("/", SuppController.getAll);
router.get(
  "/:id",
  validate(numericIdValidation, "params"),
  SuppController.getOne,
);

router.put(
  "/:id",
  validate(numericIdValidation, "params"),
  validate(updateSuppSchema),
  SuppController.updateOne,
);

router.delete(
  "/:id",
  validate(numericIdValidation, "params"),
  SuppController.delete,
);

router.patch(
  "/restore/:id",
  validate(numericIdValidation, "params"),
  SuppController.restore,
);

module.exports = router;
