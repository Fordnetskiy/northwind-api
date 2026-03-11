const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const {
  idValidation,
  queryValidation,
  createCustomerValidation,
  updateCustomerValidation,
} = require("../validation/cust.schema");

const CustController = require("../controller/cust.controller");

router.patch(
  "/restore/:id",
  validade(idValidation, "params"),
  CustController.restoreCustomer,
);

router.post(
  "/",
  validade(createCustomerValidation),
  CustController.createCustomer,
);

router.get("/", validade(queryValidation, "query"), CustController.getAll);
router.get("/:id", validade(idValidation, "params"), CustController.getOne);

router.put(
  "/:id",
  validade(idValidation, "params"),
  validade(updateCustomerValidation),
  CustController.updateCustomer,
);

router.delete(
  "/:id",
  validade(idValidation, "params"),
  CustController.deleteCustomer,
);

module.exports = router;
