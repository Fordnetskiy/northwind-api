const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const EmplController = require("../controller/empl.controller");

// CRUD routes
router.get("/:id", EmplController.getOne);

module.exports = router;
