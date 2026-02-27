const EmplService = require("../service/empl.service");

class EmplController {
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
