const db = require("../config/database");
const AppError = require("../utils/AppError");

class OrderService {
  // Create ====
  create = async (data) => {
    // Data destructurization -!-
    const {
      customerId,
      employeeId,
      freight,
      address,
      city,
      country,
      postalCode,
      productId,
      quantity,
    } = data;

    // Transaction block -!-
    const client = await db.connect();

    try {
      await client.query("BEGIN");

      // Creates order -!-
      const orderRes = await client.query(
        `
        INSERT INTO orders (customer_id, employee_id, order_date, required_date, freight, ship_address, ship_city, ship_country, ship_postal_code)
        VALUES (
          $1, $2, CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', $3, $4, $5, $6, $7
        )
        RETURNING *
      `,
        [customerId, employeeId, freight, address, city, country, postalCode],
      );
      const orderId = orderRes.rows[0].order_id;

      // Extract price and units from product table with pessimistic lock -!-
      const productRes = await client.query(
        `
        SELECT unit_price, units_in_stock
        FROM products
        WHERE product_id = $1
        FOR UPDATE
      `,
        [productId],
      );
      const price = productRes.rows[0].unit_price;
      const stock = productRes.rows[0].units_in_stock;

      if (stock === null) throw new AppError(404, "Product not found!");

      // Creates order details after order creation -!-
      await client.query(
        `
        INSERT INTO order_details (
          order_id, product_id, unit_price, quantity, discount
        ) VALUES (
          $1, $2, $3, $4, $5
        )
      `,
        [orderId, productId, price, quantity, 0],
      );

      const res = await client.query(
        `
        UPDATE products
        SET units_in_stock = units_in_stock - $1
        WHERE product_id = $2 AND units_in_stock >= $1
        RETURNING units_in_stock
      `,
        [quantity, productId],
      );

      if (res.rowCount === 0) throw new AppError(404, "Not enough stock!");

      const sum = Math.round(quantity * price);

      await client.query("COMMIT");

      return {
        order: orderRes.rows[0],
        pricePerUnit: price,
        quantity: quantity,
        totalPrice: sum,
      };
    } catch (error) {
      await client.query("ROLLBACK");

      throw new AppError(400, error.message);
    } finally {
      client.release();
    }
  };

  // Read ===
  getAll = async (q) => {
    // these variables are for pagination -!-
    const page = parseInt(q.page) || 1;
    const limit = parseInt(q.limit) || 10;
    const offset = (page - 1) * limit;

    // this -Promise.all- returns the result of two DB queries, first for a list of orders with pagination, second for page counter -!-
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
