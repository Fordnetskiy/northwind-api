const OrderService = require("../service/orders.service");

class OrderController {
  // Admin / Employee routes

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

  // Customer routes

  myOrderCreate = async (req, res, next) => {
    try {
      const customerId = req.user.customerId;
      const {
        employeeId,
        shipper,
        freight,
        address,
        city,
        country,
        postalCode,
        productId,
        quantity,
      } = req.body;

      const result = await OrderService.myCreate(customerId, {
        employeeId,
        shipper,
        freight,
        address,
        city,
        country,
        postalCode,
        productId,
        quantity,
      });

      res.status(201).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

  myOrders = async (req, res, next) => {};

  myOrder = async (req, res, next) => {};

  updateMyOrder = async (req, res, next) => {};

  deleteMyOrder = async (req, res, next) => {};
}

module.exports = new OrderController();
