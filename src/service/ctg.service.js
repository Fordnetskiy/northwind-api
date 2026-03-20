const db = require("../config/database");
const AppError = require("../utils/AppError");

class CtgService {
  #MAX_LIMIT = 50;

  getCtgProducts = async (id, q) => {};

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

    if (page > totalPages) {
      throw new AppError(
        404,
        `Page ${page} not found. Total pages available: ${totalPages}`,
      );
    }
    if (ctgRes.rowCount === 0) {
      throw new AppError(404, "Categories not exists");
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

  create = async (data) => {};

  update = async (id, data) => {};

  delete = async (id) => {};
}

module.exports = new CtgService();
