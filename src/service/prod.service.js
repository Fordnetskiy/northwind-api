const db = require("../config/database");

class ProdService {
  getAll = async () => {
    const result = db.query(`
      SELECT * FROM products
      LIMIT 20
    `);
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
