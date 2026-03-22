const db = require("../config/database");
const AppError = require("../utils/AppError");

class CtgService {
  #MAX_LIMIT = 50;

  getCtgProducts = async (id, q) => {
    const page = Math.max(parseInt(q.page) || 1, 1);
    const clientLimit = Math.max(parseInt(q.limit) || 10, 10);
    const limit = Math.min(clientLimit, this.#MAX_LIMIT);
    const offset = (page - 1) * limit;

    const [prodRes, countRes, ctgExist] = await Promise.all([
      db.query(
        `
        SELECT category_name, product_id, product_name, unit_price, units_in_stock, company_name
        FROM products
        JOIN suppliers USING(supplier_id)
        JOIN categories USING(category_id)
        WHERE category_id = $1 AND products.is_deleted = false
        ORDER BY product_id
        OFFSET $2
        LIMIT $3
      `,
        [id, offset, limit],
      ),
      db.query(
        `
        SELECT COUNT(*)
        FROM products
        WHERE category_id = $1 AND is_deleted = false
      `,
        [id],
      ),
      db.query(
        `
        SELECT category_id FROM categories WHERE category_id = $1 AND is_deleted = false
      `,
        [id],
      ),
    ]);

    if (ctgExist.rowCount === 0) {
      throw new AppError(404, "Category not found");
    }

    const totalItems = parseInt(countRes.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    if (totalItems < 1) {
      throw new AppError(404, "This category hasn't any products yet");
    }

    if (page > totalPages) {
      throw new AppError(
        400,
        `Page ${page} not found. Total pages available: ${totalPages}`,
      );
    }

    return {
      data: prodRes.rows,
      meta: {
        total: totalItems,
        page,
        totalPages,
        limit,
      },
    };
  };

  getAll = async (q) => {
    const page = Math.max(parseInt(q.page) || 1, 1);
    const clientLimit = Math.max(parseInt(q.limit) || 10, 10);
    const limit = Math.min(clientLimit, this.#MAX_LIMIT);
    const offset = (page - 1) * limit;

    const [ctgRes, ctgCount] = await Promise.all([
      db.query(
        `
        SELECT * FROM categories
        WHERE is_deleted = false
        ORDER BY category_id
        LIMIT $1
        OFFSET $2
      `,
        [limit, offset],
      ),
      db.query(`
        SELECT COUNT(*) FROM categories
        WHERE is_deleted = false
      `),
    ]);

    const totalItems = parseInt(ctgCount.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    if (ctgRes.rowCount === 0) {
      throw new AppError(404, "Categories not exists");
    }

    if (page > totalPages) {
      throw new AppError(
        404,
        `Page ${page} not found. Total pages available: ${totalPages}`,
      );
    }

    return {
      data: ctgRes.rows,
      meta: {
        total: totalItems,
        page,
        totalPages,
        limit,
      },
    };
  };
  getOne = async (id) => {
    const result = await db.query(
      `SELECT * FROM categories
      WHERE category_id = $1 AND is_deleted = false`,
      [id],
    );

    if (result.rowCount === 0) {
      throw new AppError(404, "Category not exists");
    }

    return result.rows[0];
  };

  create = async (data) => {
    const { categoryName, description } = data;
    const newCategory = await db.query(
      `
      INSERT INTO categories (category_name, description)
      VALUES ($1, $2)
      RETURNING *
    `,
      [categoryName, description],
    );

    return newCategory.rows[0];
  };

  update = async (id, data) => {
    const { categoryName, description } = data;
    const updatedCategory = await db.query(
      `
      UPDATE categories
      SET category_name = $1, description = $2
      WHERE category_id = $3 AND is_deleted = false
      RETURNING *
    `,
      [categoryName, description, id],
    );

    if (updatedCategory.rowCount === 0) {
      throw new AppError(404, "Category not exists");
    }

    return updatedCategory.rows[0];
  };

  delete = async (id) => {
    const deletedCategory = await db.query(
      `
      UPDATE categories
      SET is_deleted = true
      WHERE category_id = $1 AND is_deleted = false
      RETURNING *
    `,
      [id],
    );

    if (deletedCategory.rowCount === 0) {
      throw new AppError(404, "Category not exists");
    }

    return deletedCategory.rows[0];
  };

  deletedList = async () => {
    const deletedList = await db.query(`
      SELECT * FROM categories
      WHERE is_deleted = true
    `);

    if (deletedList.rowCount === 0) {
      throw new AppError(404, "No one is deleted for this moment");
    }

    return deletedList.rows;
  };

  restore = async (id) => {
    const restoredCategory = await db.query(
      `
      UPDATE categories
      SET is_deleted = false
      WHERE category_id = $1 AND is_deleted = true
      RETURNING *
    `,
      [id],
    );

    if (restoredCategory.rowCount === 0) {
      throw new AppError(404, "Category not exists");
    }

    return restoredCategory.rows[0];
  };
}

module.exports = new CtgService();
