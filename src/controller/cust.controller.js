const CustService = require("../service/cust.service");

class CustController {
  restoreCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await CustService.restore(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  createCustomer = async (req, res, next) => {
    try {
      const { customerId, companyName, contactName } = req.body;

      const result = await CustService.create({
        customerId,
        companyName,
        contactName,
      });

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

  updateCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        companyName,
        contactName,
        contactTitle,
        address,
        city,
        region,
        postalCode,
        country,
        phone,
        fax,
      } = req.body;

      const result = await CustService.update(id, {
        companyName,
        contactName,
        contactTitle,
        address,
        city,
        region,
        postalCode,
        country,
        phone,
        fax,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCustomer = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await CustService.delete(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getDeleted = async (req, res, next) => {
    try {
      const result = await CustService.getDeleted();

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new CustController();
