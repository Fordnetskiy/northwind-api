const { Router } = require("express");
const router = Router();
const validade = require("../middlewares/validate");
const ShippController = require("../controller/shipp.controller");

router.get("/:id", ShippController.getOne);

module.exports = router;
