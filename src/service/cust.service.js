const db = require("../config/database");
const AppError = require("../utils/AppError");

class CustService {
  #MAX_LIMIT = 50;
  getAll = async (q) => {
    // Pagination variables
    const page = Math.max(parseInt(q.page) || 1, 1); // if client`s value will be negative, 1
    const clientLimit = Math.max(parseInt(q.limit) || 10, 10); // if client`s value will be negative, 10
    const limit = Math.min(clientLimit, this.#MAX_LIMIT);
    const offset = (page - 1) * limit;

    const [customers, count] = await Promise.all([
      db.query(
        `
        SELECT * FROM customers
        LIMIT $1
        OFFSET $2
      `,
        [limit, offset],
      ),
      db.query(`
        SELECT COUNT(*) FROM customers
      `),
    ]);

    const totalItems = parseInt(count.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages) {
      throw new AppError(
        404,
        `Page ${page} not found. Total pages available: ${totalPages}`,
      );
    }

    if (customers.rowCount === 0) {
      throw new AppError(404, "Customers not exists");
    }

    return {
      data: customers.rows,
      meta: {
        total: totalItems,
        page,
        total_pages: totalPages,
        limit,
      },
    };
  };

  getById = async (id) => {
    const customerId = id.trim().toUpperCase();

    const customer = await db.query(
      `
      SELECT * FROM customers
      WHERE customer_id = $1
    `,
      [customerId],
    );

    if (customer.rowCount === 0) {
      throw new AppError(404, "Customer not exists");
    }

    return customer.rows[0];
  };
}

module.exports = new CustService();
