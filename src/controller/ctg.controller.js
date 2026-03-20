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
      const id = parseInt(req.params.id);
      const result = await CtgService.getOne(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const result = await CtgService.create(req.body);
      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await CtgService.update(id, req.body);

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
      const result = await CtgService.delete(id);

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
      const result = await CtgService.restore(id);

      res.status(200).json({
        success: true,
        message: "Category was restored",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CtgController();
