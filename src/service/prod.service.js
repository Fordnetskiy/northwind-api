const db = require("../config/database");
const AppError = require("../utils/AppError");

class ProdService {
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
      VALUES ($1, $2, $3, $4)
    `,
      [productId, productName, supplierId, categoryId],
    );

    return {
      product: {
        productId,
        productName,
        supplierId,
        categoryId,
      },
    };
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
        SELECT category_name, product_id, product_name, unit_price, company_name
        FROM products
        JOIN categories USING(category_id)
        JOIN suppliers USING(supplier_id)
        OFFSET $1
        LIMIT $2
      `,
        [offset, limit],
      ),
      db.query(`
        SELECT COUNT(*)
        FROM products
      `),
    ]);

    const totalItems = parseInt(countRes.rows[0].count);
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
        SELECT category_name, product_id, product_name, unit_price, company_name
        FROM products
        JOIN categories USING(category_id)
        JOIN suppliers USING(supplier_id)
        WHERE product_id = $1
        `,
      [id],
    );

    return result;
  };
}

module.exports = new ProdService();
