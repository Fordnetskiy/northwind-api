const SuppService = require("../service/supp.service");
const AppError = require("../utils/AppError");

class SuppController {
  // CRUD
  // Read
  // getAll = async (req, res, next) => {
  //   try {
  //     const result = await SuppService(req.query);
  //     if (!result) throw new AppError(404, "List is empty");
  //     res.status(200).json({
  //       success: true,
  //       data: result,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

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
}

module.exports = new SuppController();
