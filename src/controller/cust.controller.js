const CustService = require("../service/cust.service");

class CustController {
  getOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await CustService.getById(id);

      res.status(200).json({
        success: true,
        message: "Get customer by ID",
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
