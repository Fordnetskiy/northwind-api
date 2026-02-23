const OrderService = require("../service/orders.service");
const AppError = require("../utils/AppError");

class OrderController {
  getOne = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);

      const result = await OrderService.getOne(id);

      res.status(200).json({
        success: true,
        order: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new OrderController();
