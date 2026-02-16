const db = require("../config/database");

class ProdController {
  // Read all
  getAll = async (req, res, next) => {
    const result = await db.query(`
      SELECT * FROM products
      LIMIT 20
    `);

    res.json({
      success: true,
      data: result.rows,
    });
  };
}

module.exports = new ProdController();
