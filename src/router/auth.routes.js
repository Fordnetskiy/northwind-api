// Variables

const { Router } = require("express");
const router = Router();
const validate = require("../middlewares/validate");
const { registerSchema, loginSchema } = require("../validation/auth.schema");
const AuthController = require("../controller/auth.controller");

// Routes

router.post("/register", validate(registerSchema), AuthController.register);
router.post("/login", validate(loginSchema), AuthController.login);

module.exports = router;
