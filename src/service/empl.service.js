const db = require("../config/database");
const AppError = require("../utils/AppError");

class EmplService {
  empOrders = async (id, q) => {
    // Pagination variables
    const MAX_LIMIT = 50;

    const page = Math.max(parseInt(q.page) || 1, 1); // if client`s value will be negative, 1
    const clientLimit = Math.max(parseInt(q.limit) || 10, 10); // if client`s value will be negative, 10
    const limit = Math.min(clientLimit, MAX_LIMIT);
    const offset = (page - 1) * limit;

    const [orders, orderCount, employeeExist] = await Promise.all([
      db.query(
        `
      SELECT o.order_id, o.customer_id, c.company_name AS customer_company, e.first_name || ' ' || e.last_name AS employee_name, o.order_date, o.required_date, o.shipped_date, o.freight, o.ship_city, o.ship_country, od.product_id, od.quantity
      FROM orders o
      JOIN order_details od ON od.order_id = o.order_id
      JOIN employees e ON e.employee_id = o.employee_id
      JOIN customers c ON c.customer_id = o.customer_id
      WHERE o.employee_id = $1
      ORDER BY o.order_id DESC
      OFFSET $2
      LIMIT $3;
    `,
        [id, offset, limit],
      ),
      db.query(
        `
        SELECT COUNT(*) FROM orders
        WHERE employee_id = $1
      `,
        [id],
      ),
      db.query(
        `
        SELECT employee_id
        FROM employees
        WHERE employee_id = $1
      `,
        [id],
      ),
    ]);

    if (employeeExist.rowCount === 0) {
      throw new AppError(404, "Employee not found!");
    }

    const totalItems = parseInt(orderCount.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    if (totalItems === 0) {
      throw new AppError(200, "This employee hasn`t made any orders yet");
    }

    if (page > totalPages) {
      throw new AppError(
        400,
        `Page ${page} not found. Total pages available: ${totalPages}`,
      );
    }

    return {
      orders: orders.rows,
      pagiantion: {
        page: page,
        ordersPerPage: limit,
        totalOrders: totalItems,
        totalPages: totalPages,
      },
    };
  };

  create = async (data) => {
    const { firstName, lastName, courtesyTitle, title, city, country } = data;

    const newEmployee = await db.query(
      `
          INSERT INTO employees (last_name, first_name, title, title_of_courtesy, city, country)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *
        `,
      [lastName, firstName, title, courtesyTitle, city, country],
    );

    return newEmployee.rows[0];
  };

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
        WHERE is_deleted = false
        OFFSET $1
        LIMIT $2
      `,
        [offset, limit],
      ),
      db.query(`
        SELECT COUNT(*) FROM employees
        WHERE is_deleted = false
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
      WHERE employee_id = $1 AND is_deleted = false
    `,
      [id],
    );

    if (result.rowCount === 0) {
      throw new AppError(404, "Employer not finded/exist");
    }

    return result.rows[0];
  };

  update = async (data, id) => {
    const {
      lastName,
      firstName,
      title,
      courtesyTitle,
      birthDate,
      hireDate,
      address,
      city,
      region,
      postalCode,
      country,
      phone,
      extension,
      notes,
      reportsTo,
    } = data;

    const updatedEmployer = await db.query(
      `
      UPDATE employees SET last_name = $1, first_name = $2, title = $3, title_of_courtesy = $4,
            birth_date = $5, hire_date = $6, address = $7, city = $8, region = $9, postal_code = $10,
            country = $11, home_phone = $12, extension = $13, notes = $14, reports_to = $15
      WHERE employee_id = $16 AND is_deleted = false
      RETURNING *
    `,
      [
        lastName,
        firstName,
        title,
        courtesyTitle,
        birthDate,
        hireDate,
        address,
        city,
        region,
        postalCode,
        country,
        phone,
        extension,
        notes,
        reportsTo,
        id,
      ],
    );

    if (updatedEmployer.rowCount === 0) {
      throw new AppError(404, "Employer not found/exist!");
    }

    return updatedEmployer.rows[0];
  };

  delete = async (id) => {
    const deletedEmployee = await db.query(
      `
      UPDATE employees
      SET is_deleted = true
      WHERE employee_id = $1 AND is_deleted = false
      RETURNING employee_id
    `,
      [id],
    );

    if (deletedEmployee.rowCount === 0) {
      throw new AppError(404, "Employer not exist");
    }

    return deletedEmployee.rows[0];
  };

  restore = async (id) => {
    const restoredEmployer = await db.query(
      `
      UPDATE employees
      SET is_deleted = false
      WHERE employee_id = $1 AND is_deleted = true
      RETURNING *
    `,
      [id],
    );

    if (restoredEmployer.rowCount === 0) {
      throw new AppError(404, "Employer not found or not deleted");
    }

    return restoredEmployer.rows[0];
  };
}

module.exports = new EmplService();
