const db = require("../config/database");
const AppError = require("../utils/AppError");

class OrderService {
  // Create ====
  create = async (data) => {
    // Data destructurization -!-
    const {
      customerId,
      employeeId,
      shipper,
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

      const shipName = await client.query(
        `
        SELECT ship_name
        FROM orders
        WHERE customer_id = $1 AND ship_name IS NOT NULL
      `,
        [customerId],
      );

      // Creates order -!-
      const orderRes = await client.query(
        `
        INSERT INTO orders (customer_id, employee_id, order_date, required_date, ship_via, freight, ship_name, ship_address, ship_city, ship_country, ship_postal_code)
        VALUES (
          $1, $2, CURRENT_DATE, CURRENT_DATE + INTERVAL '7 days', $3, $4, $5, $6, $7, $8, $9
        )
        RETURNING *
      `,
        [
          customerId,
          employeeId,
          shipper,
          freight,
          shipName.rows[0].ship_name,
          address,
          city,
          country,
          postalCode,
        ],
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
        data: orderRes.rows[0],
        price,
        quantity,
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
        SELECT order_id, customer_id, c.company_name AS customer_company,
            CONCAT(first_name,  ' ', last_name) AS employee, order_date, required_date, shipped_date, s.company_name AS shipper,
            freight, ship_address, ship_city, ship_country, ship_postal_code
        FROM orders
        JOIN customers c USING(customer_id)
        JOIN employees USING(employee_id)
        JOIN shippers s ON s.shipper_id = orders.ship_via
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
      data: result.rows,
      meta: {
        total: totalItems,
        page,
        totalPages,
        limit,
      },
    };
  };

  getOne = async (id) => {
    const order = await db.query(
      `
      SELECT order_id, customer_id, c.company_name AS customer_company,
            CONCAT(first_name,  ' ', last_name) AS employee, order_date, required_date, shipped_date, s.company_name AS shipper,
            freight, ship_address, ship_city, ship_country,ship_postal_code
      FROM orders
      JOIN customers c USING(customer_id)
      JOIN employees USING(employee_id)
      JOIN shippers s ON s.shipper_id = orders.ship_via
      WHERE order_id = $1
    `,
      [id],
    );

    if (order.rowCount === 0) throw new AppError(404, "Order not found/exists");

    return order.rows[0];
  };

  update = async (data, id) => {
    const {
      requiredDate,
      shipper,
      address,
      city,
      region,
      postalCode,
      country,
    } = data;

    const updatedOrder = await db.query(
      `
      UPDATE orders 
      SET required_date = $1, ship_via = $2, 
          ship_address = $3, ship_city = $4,
          ship_region = $5, ship_postal_code = $6,
          ship_country = $7
      WHERE order_id = $8
      RETURNING *
    `,
      [requiredDate, shipper, address, city, region, postalCode, country, id],
    );

    if (updatedOrder.rowCount === 0)
      throw new AppError(404, "Order not found/exists");

    return updatedOrder.rows[0];
  };

  delete = async (id) => {
    const client = await db.connect();

    // Transaction begins

    try {
      await client.query("BEGIN");

      const orderDetails = await client.query(
        `
        SELECT product_id, quantity FROM order_details
        WHERE order_id = $1
        FOR UPDATE  
      `,
        [id],
      );

      if (orderDetails.rowCount === 0)
        throw new AppError(404, "Order not found/exists");

      const product = orderDetails.rows[0].product_id;
      const quantity = orderDetails.rows[0].quantity;

      // Deletes order details
      await client.query(
        `
        DELETE FROM order_details
        WHERE order_id = $1
      `,
        [id],
      );

      // Deletes order
      await client.query(
        `
        DELETE FROM orders
        WHERE order_id = $1
      `,
        [id],
      );

      // Restores units_in_stock for product after order deletion
      for (const row of orderDetails.rows) {
        await client.query(
          `
        UPDATE products
        SET units_in_stock = units_in_stock + $1
        WHERE product_id = $2
      `,
          [row.quantity, row.product],
        );
      }

      await client.query("COMMIT");

      return {
        message: "Order was deleted!",
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }

    // Transaction ends
  };
}

module.exports = new OrderService();
