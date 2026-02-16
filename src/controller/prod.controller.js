const db = require("../config/database");

class ProdController {
  // Read all
  getAll = async (req, res, next) => {
    try {
      const result = await db.query(`
      SELECT * FROM products
      LIMIT 20
    `);

      res.json({
        success: true,
        data: result.rows,
      });
    } catch (error) {
      next(error);
    }
  };
  // Read one
  getOne = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await db.query(
        `
        SELECT * FROM products
        WHERE product_id = $1
        `,
        [id],
      );

      res.json({
        success: true,
        data: result.rows[0],
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new ProdController();
