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

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login(email, password);

      res.status(200).json({
        success: true,
        token,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new AuthController();
