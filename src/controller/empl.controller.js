const EmplService = require("../service/empl.service");

class EmplController {
  empOrders = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await EmplService.empOrders(id, req.query);

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };

  createEmployee = async (req, res, next) => {
    try {
      const result = await EmplService.create(req.body);

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
      const result = await EmplService.findAll(req.query);

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

      const result = await EmplService.findById(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await EmplService.update(req.body, id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await EmplService.delete(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  restoreEmployee = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await EmplService.restore(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new EmplController();
