const ShippService = require("../service/shipp.service");

class ShippController {
  createShipper = async (req, res, next) => {
    try {
      const result = await ShippService.create(req.body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const result = await ShippService.getAll(req.query);

      res.json({
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
      const result = await ShippService.getOne(id);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateShipper = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await ShippService.update(id, req.body);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteShipper = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await ShippService.delete(id);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  restoreShipper = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await ShippService.restore(id);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ShippController();
