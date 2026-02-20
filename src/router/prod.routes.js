const { Router } = require("express");
const router = Router();

const {
  createProdSchema,
  updateProdSchema,
} = require("../validation/prod.schema");
const validate = require("../middlewares/validate");

const ProdController = require("../controller/prod.controller");

// Statistic routes ===
router.get("/stats", ProdController.stats);

// ===

// C.R.U.D routes ===

// Create
router.post("/", validate(createProdSchema), ProdController.createOne);

// Read
router.get("/", ProdController.getAll);
router.get("/:id", ProdController.getOne);

// Update
router.put("/:id", validate(updateProdSchema), ProdController.update);

// Delete
router.delete("/:id", ProdController.delete);

// ===

module.exports = router;
