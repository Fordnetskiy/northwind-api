const { Router } = require("express");
const router = Router();
const validate = require("../middlewares/validate");
const { createEmployee, updateEmployee } = require("../validation/empl.schema");
const { numericIdValidation } = require("../validation/shared.schema");
const EmplController = require("../controller/empl.controller");

router.post(
  "/restore/:id",
  validate(numericIdValidation, "params"),
  EmplController.restoreEmployee,
);

router.post("/", validate(createEmployee), EmplController.createEmployee);

router.get("/", EmplController.getAll);
router.get(
  "/:id",
  validate(numericIdValidation, "params"),
  EmplController.getOne,
);

router.put(
  "/:id",
  validate(numericIdValidation, "params"),
  validate(updateEmployee),
  EmplController.updateEmployee,
);

router.delete(
  "/:id",
  validate(numericIdValidation, "params"),
  EmplController.deleteEmployee,
);

// Statistics
router.get(
  "/:id/orders",
  validate(numericIdValidation, "params"),
  EmplController.empOrders,
);

module.exports = router;
