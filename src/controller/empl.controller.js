const EmplService = require("../service/empl.service");

class EmplController {
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
}

module.exports = new EmplController();
