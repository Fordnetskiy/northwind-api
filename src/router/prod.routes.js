const { Router } = require("express");
const router = Router();

const ProdController = require("../controller/prod.controller");

// Statistic routes ===
router.get("/stats", ProdController.stats);

// ===

// C.R.U.D routes ===

// Create
router.post("/", ProdController.createOne);

// Read
router.get("/", ProdController.getAll);
router.get("/:id", ProdController.getOne);

// Update
router.put("/:id", ProdController.update);

// Delete
router.delete("/:id", ProdController.delete);

// ===

module.exports = router;
