const ProdService = require("../service/prod.service");
const AppError = require("../utils/AppError");

class ProdController {
  // Create
  createOne = async (req, res, next) => {
    try {
      const result = await ProdService.create(req.body);

      res.status(201).json({
        success: true,
        message: "Product was created!",
        product: result,
      });
    } catch (error) {
      next(error);
    }
  };

  // Read all
  getAll = async (req, res, next) => {
    try {
      const result = await ProdService.getAll(req.query);

      res.json({
        success: true,
        ...result,
      });
    } catch (error) {
      next(error);
    }
  };
  // Read one
  getOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await ProdService.getOne(id);

      if (result.rowCount === 0) throw new AppError(404, "Product not exists");

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  };

  // Update
  update = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await ProdService.update(req.body, id);

      res.status(200).json({
        succes: true,
        message: "Product was updated!",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ProdController();
