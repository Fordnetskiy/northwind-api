const db = require("../config/database");
const AppError = require("../utils/AppError");

class OrderService {
  getAll = async (q) => {
    // these variables are for pagination
    const page = parseInt(q.page) || 1;
    const limit = parseInt(q.limit) || 10;
    const offset = (page - 1) * limit;

    // this -Promise.all- returns the result of two DB queries, first for a list of orders with pagination, second for page counter
    const [result, totItems] = await Promise.all([
      db.query(
        `
        SELECT order_id, company_name AS customer,
            CONCAT(first_name,  ' ', last_name) AS employee, order_date, required_date, shipped_date, 
            freight, ship_address, ship_city, ship_country,ship_postal_code
        FROM orders
        JOIN customers USING(customer_id)
        JOIN employees USING(employee_id)
        ORDER BY order_id
        OFFSET $1
        LIMIT $2
      `,
        [offset, limit],
      ),
      db.query(`
        SELECT COUNT(*)
        FROM orders
      `),
    ]);

    const totalItems = parseInt(totItems.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages)
      throw new AppError(400, `There is ${totalPages} pages only, not more`);

    return {
      orders: result.rows,
      pagiantion: {
        total_items: totalItems,
        total_pages: totalPages,
        current_page: page,
        items_per_page: limit,
      },
    };
  };

  getOne = async (id) => {
    const order = await db.query(
      `
      SELECT order_id, company_name AS customer,
             CONCAT(first_name,  ' ', last_name) AS employee, order_date, required_date, shipped_date, 
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
