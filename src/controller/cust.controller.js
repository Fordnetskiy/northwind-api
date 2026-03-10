const CustService = require("../service/cust.service");

class CustController {
  getAll = async (req, res, next) => {
    try {
      const result = await CustService.getAll(req.query);

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
      const { id } = req.params;
      const result = await CustService.getById(id);

      res.status(200).json({
        success: true,
        data: {
          customer: result,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CustController();
