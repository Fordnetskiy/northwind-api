const db = require("../config/database");

class ProdService {
  getAll = async (q) => {
    // pagiantion
    const { page = 1, limit = 10 } = q;
    const offset = (page - 1) * limit;

    const result = db.query(
      `
      SELECT product_id, product_name, unit_price 
      FROM products
      OFFSET $1
      LIMIT $2
    `,
      [offset, limit],
    );
    return result;
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
