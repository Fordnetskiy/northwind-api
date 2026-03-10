const db = require("../config/database");
const AppError = require("../utils/AppError");

class CustService {
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
