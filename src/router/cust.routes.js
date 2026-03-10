const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const { idValidation } = require("../validation/cust.schema");

const CustController = require("../controller/cust.controller");

router.get("/:id", validade(idValidation, "params"), CustController.getOne);

module.exports = router;
