const { verifyToken } = require("../utils/jwt.token");
const AppError = require("../utils/AppError");

const AuthCheck = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(
      new AppError(401, "Access is denied. Token missing or invalid."),
    );
  }

  const token = header.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(new AppError(401, "Invalid or expired token."));
  }
};

const RoleCheck = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError(403, "You don`t have permission for this action"),
      );
    }

    next();
  };
};

module.exports = { AuthCheck, RoleCheck };
