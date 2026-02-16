const { Router } = require("express");
const router = Router();

const ProdController = require("../controller/prod.controller");

// C.R.U.D routes ===

// Create
router.post("/");

// Read
router.get("/", ProdController.getAll);
router.get("/:id");

// update
router.put("/:id");

// Delete
router.delete("/:id");

// ===

module.exports = router;
