const db = require("../config/database");
const AppError = require("../utils/AppError");

class ShippService {
  create = async (data) => {
    const { companyName, phone } = data;

    const nameCheck = await db.query(
      `
        SELECT company_name
        FROM shippers
        WHERE company_name = $1
        FOR UPDATE
      `,
      [companyName],
    );

    if (nameCheck.rowCount !== 0) {
      throw new AppError(400, "Shipper with this company name already exists!");
    }

    const newShipper = await db.query(
      `
      INSERT INTO shippers (company_name, phone)
      VALUES ($1, $2)
      RETURNING *
    `,
      [companyName, phone],
    );

    return newShipper.rows[0];
  };

  getAll = async (q) => {
    // Pagination variables
    const page = parseInt(q.page) || 1;
    const limit = parseInt(q.limit) || 10;
    const offset = (page - 1) * limit;

    // Returning all shippers and count from Promise.all[s, c]
    const [shipRes, shipCount] = await Promise.all([
      db.query(
        `
        SELECT * FROM shippers
        WHERE is_deleted = false
        ORDER BY shipper_id ASC
        OFFSET $1
        LIMIT $2
      `,
        [offset, limit],
      ),
      db.query(`
        SELECT COUNT(*) FROM shippers
        WHERE is_deleted = false
      `),
    ]);

    const totalItems = parseInt(shipCount.rows[0].count);
    const totalPages = Math.ceil(totalItems / limit);

    if (page > totalPages) {
      throw new AppError(
        400,
        `There is not much pages, only ${page} pages with limit ${limit}`,
      );
    }

    return {
      data: shipRes.rows,
      meta: {
        total: totalItems,
        page,
        totalPages,
        limit,
      },
    };
  };

  getOne = async (id) => {
    const shipper = await db.query(
      `
      SELECT * FROM shippers 
      WHERE shipper_id = $1 AND is_deleted = false
    `,
      [id],
    );

    if (shipper.rowCount === 0) {
      throw new AppError(404, "Shipper not finded/exists");
    }

    return shipper.rows[0];
  };

  update = async (id, data) => {
    const { companyName, phone } = data;

    const updatedShipper = await db.query(
      `
      UPDATE shippers
      SET company_name = $1, phone = $2
      WHERE shipper_id = $3
      RETURNING *
    `,
      [companyName, phone, id],
    );

    if (updatedShipper.rowCount === 0) {
      throw new AppError(404, "Shipper not finded/exists!");
    }

    return updatedShipper.rows[0];
  };

  delete = async (id) => {
    const deletedShipper = await db.query(
      `
      UPDATE shippers
      SET is_deleted = true
      WHERE shipper_id = $1 AND is_deleted = false
      RETURNING *
    `,
      [id],
    );

    if (deletedShipper.rowCount === 0) {
      throw new AppError(404, "Shipper not finded/exists!");
    }

    return deletedShipper.rows[0];
  };

  restore = async (id) => {
    const existed = await db.query(
      `
      SELECT is_deleted
      FROM shippers
      WHERE shipper_id = $1 AND is_deleted = false
      FOR UPDATE
    `,
      [id],
    );

    if (existed.rowCount !== 0) {
      throw new AppError(400, "This shipper is not deleted!");
    }

    const restoredShipper = await db.query(
      `
      UPDATE shippers
      SET is_deleted = false
      WHERE shipper_id = $1
      RETURNING *
    `,
      [id],
    );

    if (restoredShipper.rowCount === 0) {
      throw new AppError(404, "Shipper not finded/exists");
    }

    return restoredShipper.rows[0];
  };
}

module.exports = new ShippService();
