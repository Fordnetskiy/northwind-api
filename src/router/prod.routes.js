const { Router } = require("express");
const router = Router();

// C.R.U.D routes ===

// Create
router.post("/");

// Read
router.get("/");
router.get("/:id");

// update
router.put("/:id");

// Delete
router.delete("/:id");

// ===

module.exports = router;
