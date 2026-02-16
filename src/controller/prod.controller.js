const ProdService = require("../service/prod.service");

class ProdController {
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

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ProdController();
