const { Router } = require("express");
const router = Router();

const SuppController = require("../controller/supp.controller");

// C.R.U.D routes ===

// Create
router.post("/", SuppController.create);

// Read
router.get("/", SuppController.getAll);
router.get("/:id", SuppController.getOne);

// // Update
router.put("/:id", SuppController.updateOne);

// // Delete
router.delete("/:id", SuppController.delete);

// ===

router.post("/restore/:id", SuppController.restore);

module.exports = router;
