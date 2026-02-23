const db = require("../config/database");
const AppError = require("../utils/AppError");

class OrderService {
  getOne = async (id) => {
    const order = await db.query(
      `
      SELECT order_id, company_name AS customer,
             CONCAT(first_name,  ' ', last_name) AS employee, order_date, shipped_date, 
             freight, ship_address, ship_city, ship_country,ship_postal_code
      FROM orders
      JOIN customers USING(customer_id)
      JOIN employees USING(employee_id)
      WHERE order_id = $1
    `,
      [id],
    );

    if (order.rowCount === 0)
      throw new AppError(
        404,
        "Order not found OR id must be between 10247 AND 11081",
      );

    return order.rows[0];
  };
}

module.exports = new OrderService();
