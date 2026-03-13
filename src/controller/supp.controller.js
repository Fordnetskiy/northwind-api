const SuppService = require("../service/supp.service");
const AppError = require("../utils/AppError");

class SuppController {
  create = async (req, res, next) => {
    try {
      const result = await SuppService.create(req.body);

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
      const result = await SuppService.getAll(req.query);

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
      const result = await SuppService.getOne(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  updateOne = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await SuppService.update(req.body, id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await SuppService.delete(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  restore = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await SuppService.restore(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new SuppController();
