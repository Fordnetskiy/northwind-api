const db = require("../config/database");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.token");

class AuthService {
  // Private
  #SALT_ROUNDS = 10;
  #generateId = async (email) => {
    const base = email
      .split("@")[0]
      .replace(/[^a-zA-Z]/g, "")
      .toUpperCase()
      .slice(0, 5)
      .padEnd(5, "X");

    const exist = await db.query(
      `
        SELECT customer_id FROM customers
        WHERE customer_id = $1
      `,
      [base],
    );

    if (exist.rowCount === 0) return base;

    for (let i = 1; i <= 9; i++) {
      const candidate = base.slice(0, 4) + i;
      const taken = await db.query(
        `
          SELECT customer_id FROM customers
          WHERE customer_id = $1
        `,
        [candidate],
      );
      if (taken.rowCount === 0) return candidate;
    }

    throw new AppError(500, "Fail to generete customer ID");
  };

  // Routes
  register = async (email, password) => {
    const exists = await db.query(
      `
      SELECT email FROM users WHERE email = $1
    `,
      [email],
    );

    if (exists.rowCount !== 0) {
      throw new AppError(409, "This email already exists");
    }

    const passwordHash = await bcrypt.hash(password, this.#SALT_ROUNDS);
    const customerId = await this.#generateId(email);
    const contactName = email.split("@")[0];
    console.log(contactName);

    // transaction
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      // created user profile
      await client.query(
        `
        INSERT INTO customers (customer_id, contact_name)
        VALUES (
          $1, $2
        )
      `,
        [customerId, contactName],
      );
      console.log(`${customerId} - ${contactName}`);

      // created user account
      const { rows } = await client.query(
        `
        INSERT INTO users (email, password_hash, customer_id)
        VALUES (
          $1, $2, $3
        )
        RETURNING id, email, role, employee_id, customer_id, is_active, created_at, updated_at
      `,
        [email, passwordHash, customerId],
      );
      console.log(rows[0]);

      await client.query("COMMIT");

      return rows[0];
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  };

  login = async (email, password) => {
    const user = await db.query(
      `
      SELECT id, email, password_hash, role, employee_id, customer_id
      FROM users
      WHERE email = $1
    `,
      [email],
    );

    if (user.rowCount === 0) {
      throw new AppError(401, "Wrong email or password");
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password_hash);

    if (!isMatch) {
      throw new AppError(401, "Wrong email or password");
    }

    const { id, role, employee_id, customer_id } = user.rows[0];
    const payload = {
      sub: id,
      role,
      employeeId: employee_id,
      customerId: customer_id,
    };

    const token = generateToken(payload);
    console.log(token);

    return token;
  };
}

module.exports = new AuthService();
