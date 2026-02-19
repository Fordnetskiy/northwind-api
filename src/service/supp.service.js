const db = require("../config/database");
const AppError = require("../utils/AppError");

class SuppService {
  getAll = async (q) => {
    // Pagination
    const page = parseInt(q.page) || 1;
    const limit = parseInt(q.limit) || 10;
    const offset = (page - 1) * limit;

    const [supRes, supCount] = await Promise.all([
      db.query(
        `
        SELECT supplier_id, company_name,
        contact_name, phone, city, country
        FROM suppliers
        ORDER BY supplier_id
        OFFSET $1
        LIMIT $2
      `,
        [offset, limit],
      ),
      db.query(`
        SELECT COUNT(*)
        FROM suppliers
      `),
    ]);

    const totalItems = parseInt(supCount.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages)
      throw new AppError(400, `There is ${totalPages} pages only, not more`);

    return {
      suppliers: supRes.rows,
      pagination: {
        total_items: totalItems,
        total_pages: totalPages,
        current_page: page,
        items_per_page: limit,
      },
    };
  };

  getOne = async (id) => {
    const result = await db.query(
      `
      SELECT * 
      FROM suppliers
      WHERE supplier_id = $1
    `,
      [id],
    );

    if (result.rowCount === 0) throw new AppError(404, "Supplier not found!");

    return result.rows[0];
  };
}

module.exports = new SuppService();
