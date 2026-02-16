const db = require("../config/database");

class ProdService {
  getAll = async (q) => {
    // pagiantion
    const page = parseInt(q.page) || 1;
    const limit = parseInt(q.limit) || 10;
    const offset = (page - 1) * limit;

    const [prodRes, countRes] = await Promise.all([
      db.query(
        `
        SELECT product_id, product_name, unit_price
        FROM products
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
        SELECT * FROM products
        WHERE product_id = $1
        `,
      [id],
    );
    return result;
  };
}

module.exports = new ProdService();
