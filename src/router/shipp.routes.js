const { Router } = require("express");
const router = Router();
const validate = require("../middlewares/validate");
const {
  createShipperSchema,
  updateShipperSchema,
} = require("../validation/shipp.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const ShippController = require("../controller/shipp.controller");

router.patch(
  "/restore/:id",
  validate(numericIdValidation, "params"),
  ShippController.restoreShipper,
);

router.post("/", validate(createShipperSchema), ShippController.createShipper);

router.get("/", ShippController.getAll);
router.get(
  "/:id",
  validate(numericIdValidation, "params"),
  ShippController.getOne,
);

router.put(
  "/:id",
  validate(numericIdValidation, "params"),
  validate(updateShipperSchema),
  ShippController.updateShipper,
);

router.delete(
  "/:id",
  validate(numericIdValidation, "params"),
  ShippController.deleteShipper,
);

module.exports = router;
