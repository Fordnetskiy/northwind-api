const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const { idValidation, queryValidation } = require("../validation/cust.schema");

const CustController = require("../controller/cust.controller");

router.get("/", validade(queryValidation, "query"), CustController.getAll);
router.get("/:id", validade(idValidation, "params"), CustController.getOne);

module.exports = router;
