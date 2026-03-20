// Variables

const { Router } = require("express");
const router = Router();
const { AuthCheck, RoleCheck } = require("../middlewares/auth.checker");
const validate = require("../middlewares/validate");
const {} = require("../validation/ctg.schema");
const CtgController = require("../controller/ctg.controller");

// Routes

module.exports = router;
