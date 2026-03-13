const OrderService = require("../service/orders.service");

class OrderController {
  create = async (req, res, next) => {
    try {
      const result = await OrderService.create(req.body);

      res.status(201).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const result = await OrderService.getAll(req.query);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await OrderService.getOne(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateOrder = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await OrderService.update(req.body, id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteOrder = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await OrderService.delete(id);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new OrderController();
