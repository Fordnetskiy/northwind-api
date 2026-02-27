const EmplService = require("../service/empl.service");

class EmplController {
  createEmployee = async (req, res, next) => {
    try {
      const result = await EmplService.create(req.body);

      res.status(201).json({
        success: true,
        message: "The new employer was created",
        employer: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const employersList = await EmplService.findAll(req.query);

      res.status(200).json({
        success: true,
        message: "Employees was finded",
        ...employersList,
      });
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);

      const employee = await EmplService.findById(id);

      res.status(200).json({
        success: true,
        message: "Employer was finded!",
        employer: employee,
      });
    } catch (error) {
      next(error);
    }
  };

  updateEmployee = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await EmplService.update(req.body, id);

      res.status(200).json({
        success: true,
        message: "Employer credentials was updated",
        employer: result,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteEmployee = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const result = await EmplService.delete(id);

      res.status(200).json({
        success: true,
        message: "Employer was deleted!",
        employer: result,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new EmplController();
