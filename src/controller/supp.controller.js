const SuppService = require("../service/supp.service");
const AppError = require("../utils/AppError");

class SuppController {
  // CRUD

  // Create
  create = async (req, res, next) => {
    try {
      const result = await SuppService.create(req.body);

      res.status(201).json({
        success: true,
        message: "New supplier was added",
        supplier: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Read
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

      if (isNaN(id)) throw new AppError(400, "ID must be a number");

      if (id < 0) throw new AppError(400, "ID cannot be negative!");

      const result = await SuppService.getOne(id);

      res.status(200).json({
        success: true,
        supplier: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Update
  updateOne = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await SuppService.update(req.body, id);

      res.status(200).json({
        success: true,
        message: "Supplier was updated",
        supplier: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Delete
  delete = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      await SuppService.delete(id);

      res.status(200).json({
        success: true,
        message: "Supplier was deleted",
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new SuppController();
