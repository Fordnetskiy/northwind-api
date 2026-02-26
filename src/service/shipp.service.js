const db = require("../config/database");
const AppError = require("../utils/AppError");

class ShippService {
  getOne = async (id) => {
    const shipper = await db.query(
      `
      SELECT * FROM shippers 
      WHERE shipper_id = $1
    `,
      [id],
    );

    if (shipper.rowCount === 0)
      throw new AppError(404, "Shipper not found/exists");

    return shipper.rows[0];
  };
}

module.exports = new ShippService();
