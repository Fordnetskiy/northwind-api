const db = require("../config/database");
const AppError = require("../utils/AppError");

class EmplService {
  findById = async (id) => {
    const result = await db.query(
      `
      SELECT employee_id AS id, CONCAT(title_of_courtesy, ' ', first_name, ' ', last_name) AS fullName,
            title, city, country, home_phone
      FROM employees
      WHERE employee_id = $1
    `,
      [id],
    );

    if (result.rowCount === 0) {
      throw new AppError(404, "Employer not finded/exist");
    }

    return result.rows[0];
  };
}

module.exports = new EmplService();
