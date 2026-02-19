const { Router } = require("express");
const router = Router();

const SuppController = require("../controller/supp.controller");

// C.R.U.D routes ===

// Create
// router.post("/");

// Read
router.get("/", SuppController.getAll);
router.get("/:id", SuppController.getOne);

// // Update
// router.put("/:id");

// // Delete
// router.delete("/:id");

// ===

module.exports = router;
