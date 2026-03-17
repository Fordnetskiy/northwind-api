// Variables

const { Router } = require("express");
const router = Router();
const {
  AuthCheck,
  RoleCheck,
  OwnerCheck,
} = require("../middlewares/auth.checker");
const validade = require("../middlewares/validate");
const {
  idValidation,
  queryValidation,
  createCustomerValidation,
  updateCustomerValidation,
} = require("../validation/cust.schema");
const CustController = require("../controller/cust.controller");

// Routes

router.get(
  "/deleted",
  AuthCheck,
  RoleCheck(["admin"]),
  CustController.getDeleted,
);
router.patch(
  "/restore/:id",
  AuthCheck,
  RoleCheck(["admin"]),
  validade(idValidation, "params"),
  CustController.restoreCustomer,
);

router.post(
  "/",
  AuthCheck,
  RoleCheck(["admin"]),
  validade(createCustomerValidation),
  CustController.createCustomer,
);

router.get(
  "/",
  AuthCheck,
  validade(queryValidation, "query"),
  CustController.getAll,
);
router.get(
  "/:id",
  AuthCheck,
  validade(idValidation, "params"),
  CustController.getOne,
);

router.put(
  "/:id",
  AuthCheck,
  validade(idValidation, "params"),
  OwnerCheck,
  validade(updateCustomerValidation),
  CustController.updateCustomer,
);

router.delete(
  "/:id",
  AuthCheck,
  validade(idValidation, "params"),
  OwnerCheck,
  CustController.deleteCustomer,
);

module.exports = router;
