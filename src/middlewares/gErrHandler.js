const errorHandler = (err, req, res, next) => {
  const status = req.status || 500;
  const message = req.message || "Internal Server Error";
  res.status(status).json({
    success: false,
    message: message,
  });
};

module.exports = errorHandler;
