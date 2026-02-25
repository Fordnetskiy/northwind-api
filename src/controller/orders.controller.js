const OrderService = require("../service/orders.service");
const AppError = require("../utils/AppError");

class OrderController {
  create = async (req, res, next) => {
    try {
      const newOrder = await OrderService.create(req.body);

      res.status(201).json({
        success: true,
        ...newOrder,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const result = await OrderService.getAll(req.query);

      res.status(200).json({
        message: "Success",
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
        order: result,
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
        message: "Order was updated",
        order: result,
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
