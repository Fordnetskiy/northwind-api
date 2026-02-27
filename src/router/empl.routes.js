const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const { createEmployee, updateEmployee } = require("../validation/empl.schema");
const EmplController = require("../controller/empl.controller");

// CRUD routes
router.get("/", EmplController.getAll);
router.get("/:id", EmplController.getOne);

module.exports = router;
