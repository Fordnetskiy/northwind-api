const { Router } = require("express");
const router = Router();

const ProdController = require("../controller/prod.controller");

// C.R.U.D routes ===

// Create
router.post("/", ProdController.createOne);

// Read
router.get("/", ProdController.getAll);
router.get("/:id", ProdController.getOne);

// update
// router.put("/:id");

// Delete
// router.delete("/:id");

// ===

module.exports = router;
