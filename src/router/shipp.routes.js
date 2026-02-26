const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const {
  createShipperSchema,
  updateShipperSchema,
} = require("../validation/shipp.schema");
const ShippController = require("../controller/shipp.controller");

router.post("/", validade(createShipperSchema), ShippController.createShipper);

router.get("/", ShippController.getAll);
router.get("/:id", ShippController.getOne);

router.put(
  "/:id",
  validade(updateShipperSchema),
  ShippController.updateShipper,
);

module.exports = router;
