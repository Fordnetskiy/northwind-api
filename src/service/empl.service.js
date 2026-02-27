const db = require("../config/database");
const AppError = require("../utils/AppError");

class EmplService {
  findAll = async (q) => {
    // Pagination variables
    const page = parseInt(q.page) || 1;
    const limit = parseInt(q.limit) || 10;
    const offset = (page - 1) * limit;

    const [empRes, empCount] = await Promise.all([
      db.query(
        `
        SELECT employee_id AS id, CONCAT(title_of_courtesy, ' ', first_name, ' ', last_name) AS fullName,
            title, city, country, home_phone
        FROM employees
        OFFSET $1
        LIMIT $2
      `,
        [offset, limit],
      ),
      db.query(`
        SELECT COUNT(*) FROM employees
      `),
    ]);

    const totalItems = parseInt(empCount.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages) {
      throw new AppError(
        400,
        `There is ${page} pages with limit ${limit} only!`,
      );
    }

    if (empRes.rowCount === 0) {
      throw new AppError(404, "Employers list are empty!");
    }

    return {
      employersList: empRes.rows,
      pagination: {
        page: page,
        itemsPerPage: limit,
        totalEmployers: totalItems,
        totalPages: totalPages,
      },
    };
  };

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
