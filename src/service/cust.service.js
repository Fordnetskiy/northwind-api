const db = require("../config/database");
const AppError = require("../utils/AppError");

class CustService {
  #MAX_LIMIT = 50;

  restore = async (id) => {
    const restored = await db.query(
      `
      UPDATE customers SET is_deleted = false
      WHERE customer_id = $1 AND is_deleted = true
      RETURNING customer_id, is_deleted
    `,
      [id],
    );

    if (restored.rowCount === 0) {
      throw new AppError(404, "Customer not found, or not deleted");
    }

    return restored.rows[0];
  };

  create = async (data) => {
    const { customerId, companyName, contactName } = data;

    const createdCustomer = await db.query(
      `
      INSERT INTO customers (customer_id, company_name, contact_name)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [customerId, companyName, contactName],
    );

    return createdCustomer.rows[0];
  };

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
        WHERE is_deleted = false
        LIMIT $1
        OFFSET $2
      `,
        [limit, offset],
      ),
      db.query(`
        SELECT COUNT(*) FROM customers WHERE is_deleted = false
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
        totalPages,
        limit,
      },
    };
  };

  getById = async (id) => {
    const customerId = id.trim().toUpperCase();

    const customer = await db.query(
      `
      SELECT * FROM customers
      WHERE customer_id = $1 AND is_deleted = false
    `,
      [customerId],
    );

    if (customer.rowCount === 0) {
      throw new AppError(404, "Customer not exists");
    }

    return customer.rows[0];
  };

  update = async (id, data) => {
    const {
      companyName,
      contactName,
      contactTitle,
      address,
      city,
      region,
      postalCode,
      country,
      phone,
      fax,
    } = data;

    const updatedCustomer = await db.query(
      `
      UPDATE customers SET company_name = $1, contact_name = $2, contact_title = $3, address = $4, city = $5, region = $6, postal_code = $7, country = $8, phone = $9, fax = $10
      WHERE customer_id = $11 AND is_deleted = false
      RETURNING *
    `,
      [
        companyName,
        contactName,
        contactTitle,
        address,
        city,
        region,
        postalCode,
        country,
        phone,
        fax,
        id,
      ],
    );

    if (updatedCustomer.rowCount === 0) {
      throw new AppError(404, "Customer not found for update!");
    }

    return updatedCustomer.rows[0];
  };

  delete = async (id) => {
    const deleted = await db.query(
      `
      UPDATE customers SET is_deleted = true
      WHERE customer_id = $1 AND is_deleted = false
      RETURNING customer_id, is_deleted
    `,
      [id],
    );

    if (deleted.rowCount === 0) {
      throw new AppError(404, "Customer not found");
    }

    return deleted.rows[0];
  };

  getDeleted = async () => {
    const deletedList = await db.query(`
      SELECT * FROM customers
      WHERE is_deleted = true
    `);

    if (deletedList.rowCount === 0) {
      throw new AppError(404, "No one is deleted for this moment");
    }

    return deletedList.rows;
  };
}

module.exports = new CustService();
