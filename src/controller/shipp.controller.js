const ShippService = require("../service/shipp.service");
const AppError = require("../utils/AppError");

class ShippController {
  getAll = async (req, res, next) => {
    try {
      const result = await ShippService.getAll(req.query);

      res.json({
        success: true,
        message: "Shippers was founded",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await ShippService.getOne(id);

      res.json({
        success: true,
        message: "Shipper was found",
        shipper: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ShippController();
