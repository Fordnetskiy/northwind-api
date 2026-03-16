const AuthService = require("../service/auth.service");

class AuthController {
  register = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.register(email, password);

      res.status(201).json({
        success: true,
        message: "User account was created",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
