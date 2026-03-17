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

const OwnerCheck = (req, res, next) => {
  const isOwnerCustomer = req.user.customerId === req.params.id;
  const isOwnerEmployee = req.user.employeeId === req.params.id;
  const isAdmin = req.user.role === "admin";

  if (!isOwnerCustomer && !isOwnerEmployee && !isAdmin) {
    return next(new AppError(403, "Access is denied!"));
  }

  next();
};

module.exports = { AuthCheck, RoleCheck, OwnerCheck };
