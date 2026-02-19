const { Router } = require("express");
const router = Router();

const SuppController = require("../controller/supp.controller");

// C.R.U.D routes ===

// Create
router.post("/");

// Read
router.get("/");
router.get("/:id");

// Update
router.put("/:id");

// Delete
router.delete("/:id");

// ===

module.exports = router;
