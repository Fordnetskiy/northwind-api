const db = require("../config/database");
const AppError = require("../utils/AppError");

class ProdService {
  // Statistics
  stats = async (q) => {
    const result = await db.query(`
      SELECT COUNT(*) AS total_products,
             MIN(unit_price) AS minimum_price,
             MAX(unit_price) AS maximum_price,
             CEIL(AVG(unit_price)) AS average_price,
             SUM(unit_price) AS sum_of_prices
      FROM products
      WHERE is_deleted = false
    `);
    return result.rows;
  };
  // Create
  create = async (data) => {
    const { productId, productName, supplierId, categoryId } = data;

    if (!productId || !productName || !supplierId || !categoryId)
      throw new AppError(400, "Missing important fields!");

    if (typeof productName !== "string")
      throw new AppError(400, "Product name must be a string value!");

    if (
      typeof productId === "string" ||
      typeof supplierId === "string" ||
      typeof categoryId === "string"
    )
      throw new AppError(400, "IDs must be a numeric!");

    const product = await db.query(
      `
      INSERT INTO products 
      (product_id, product_name, supplier_id, category_id)
      VALUES ($1, $2, $3, $4) RETURNING *
    `,
      [productId, productName, supplierId, categoryId],
    );

    return product.rows[0];
  };

  // Read
  getAll = async (q) => {
    // pagiantion
    const page = parseInt(q.page) || 1;
    const limit = parseInt(q.limit) || 10;
    const offset = (page - 1) * limit;

    const [prodRes, countRes] = await Promise.all([
      db.query(
        `
        SELECT category_name, product_id, product_name, unit_price, units_in_stock, company_name
        FROM products
        JOIN categories USING(category_id)
        JOIN suppliers USING(supplier_id)
        WHERE is_deleted = false
        OFFSET $1
        LIMIT $2
      `,
        [offset, limit],
      ),
      db.query(`
        SELECT COUNT(*)
        FROM products
        WHERE is_deleted = false
      `),
    ]);

    const totalItems = parseInt(countRes.rows[0].count - 1);
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages)
      throw new AppError(400, `There is ${totalPages} pages only, not more`);

    return {
      products: prodRes.rows,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit,
      },
    };
  };

  getOne = async (id) => {
    const result = db.query(
      `
        SELECT category_name, product_id, product_name, unit_price, units_in_stock, company_name
        FROM products
        JOIN categories USING(category_id)
        JOIN suppliers USING(supplier_id)
        WHERE product_id = $1 AND is_deleted = false
        `,
      [id],
    );

    return result;
  };

  // Update
  update = async (data, id) => {
    const { productName, supplierId, categoryId, unit_price, units_in_stock } =
      data;

    if (!data) throw new AppError(400, "Wrong data");

    if (typeof unit_price && typeof units_in_stock !== "number")
      throw new AppError(400, "Price or quantity must be a number!");

    const result = await db.query(
      `
      UPDATE products SET
      product_name = $1, supplier_id = $2, category_id = $3, unit_price = $4, units_in_stock = $5
      WHERE product_id = $6 RETURNING *
    `,
      [productName, supplierId, categoryId, unit_price, units_in_stock, id],
    );

    return result.rows[0];
  };

  // Delete
  delete = async (id) => {
    const result = await db.query(
      `
      UPDATE products
      SET is_deleted = true, discontinued = 1
      WHERE product_id = $1
      RETURNING *
    `,
      [id],
    );
    return result.rows[0];
  };
}

module.exports = new ProdService();
