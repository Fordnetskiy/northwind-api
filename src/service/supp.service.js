const db = require("../config/database");
const AppError = require("../utils/AppError");

class SuppService {
  create = async (data) => {
    const {
      supplierId,
      companyName,
      contactName,
      contactTitle,
      address,
      city,
      postalCode,
      country,
      phone,
    } = data;

    if (typeof supplierId !== "number")
      throw new AppError(400, "ID must be a number!");

    const newItem = await db.query(
      `
      INSERT INTO suppliers (
        supplier_id, company_name, contact_name, contact_title, address, city, postal_code, country, phone
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )
        RETURNING *
    `,
      [
        supplierId,
        companyName,
        contactName,
        contactTitle,
        address,
        city,
        postalCode,
        country,
        phone,
      ],
    );

    return newItem.rows[0];
  };

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
        WHERE is_deleted = false
        ORDER BY supplier_id
        OFFSET $1
        LIMIT $2
      `,
        [offset, limit],
      ),
      db.query(`
        SELECT COUNT(*)
        FROM suppliers
        WHERE is_deleted = false
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
      WHERE supplier_id = $1 AND is_deleted = false
    `,
      [id],
    );

    if (result.rowCount === 0) throw new AppError(404, "Supplier not found!");

    return result.rows[0];
  };

  update = async (data, id) => {
    const {
      supplierId,
      companyName,
      contactName,
      contactTitle,
      address,
      city,
      region,
      postalCode,
      country,
      phone,
      fax,
      homepage,
    } = data;

    const updatedItem = await db.query(
      `
      UPDATE suppliers
      SET company_name = $1,
      contact_name = $2, contact_title = $3,
      address = $4, city = $5, region = $6, postal_code = $7, country = $8, phone = $9,
      fax = $10, homepage = $11
      WHERE supplier_id = $12 AND is_deleted = false
      RETURNING *
    `,
      [
        companyName,
        contactName,
        contactTitle,
        address,
        city,
        region,
        postalCode,
        country,
        phone,
        fax,
        homepage,
        id,
      ],
    );

    if (updatedItem.rowCount === 0)
      throw new AppError(404, "Supplier not exists");

    return updatedItem.rows[0];
  };

  delete = async (id) => {
    const deletedItem = await db.query(
      `
      UPDATE suppliers
      SET is_deleted = true
      WHERE supplier_id = $1
    `,
      [id],
    );

    return deletedItem;
  };

  restore = async (id) => {
    const isDeleted = await db.query(
      `
        SELECT supplier_id, is_deleted
        FROM suppliers
        WHERE supplier_id = $1
      `,
      [id],
    );

    if (isDeleted.rowCount === 0)
      throw new AppError(404, "Supplier not found!");

    if (isDeleted.rows[0].is_deleted === false)
      throw new AppError(400, "Cannot restore the existing supplier!");

    const restored = await db.query(
      `
      UPDATE suppliers
      SET is_deleted = false
      WHERE supplier_id = $1
      RETURNING *
    `,
      [id],
    );

    return restored.rows[0];
  };
}

module.exports = new SuppService();
