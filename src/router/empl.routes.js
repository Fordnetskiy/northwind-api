const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const { createEmployee, updateEmployee } = require("../validation/empl.schema");
const EmplController = require("../controller/empl.controller");

// Specific routes
router.post("/restore/:id", EmplController.restoreEmployee);

// CRUD routes
router.post("/", validade(createEmployee), EmplController.createEmployee);
router.get("/", EmplController.getAll);
router.get("/:id", EmplController.getOne);
router.put("/:id", validade(updateEmployee), EmplController.updateEmployee);
router.delete("/:id", EmplController.deleteEmployee);

module.exports = router;
