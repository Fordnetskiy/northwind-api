const CtgService = require("../service/ctg.service");

class CtgController {
  getCtgProducts = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const result = await CtgService.getAll(req.query);

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
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CtgController();
