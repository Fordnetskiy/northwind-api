// src/docs/shippers.js

/**
 * @swagger
 * tags:
 *   name: Shippers
 *   description: Shippers management
 */

/**
 * @swagger
 * /api/v1/shippers:
 *   get:
 *     summary: Get all shippers
 *     tags: [Shippers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 10
 *           maximum: 50
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - shipper_id: 1
 *                   company_name: Speedy Express
 *                   phone: (503) 555-9831
 *               meta:
 *                 total: 3
 *                 page: 1
 *                 total_pages: 1
 *                 limit: 10
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/shippers/restore/{id}:
 *   patch:
 *     summary: Restore deleted shipper
 *     tags: [Shippers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Shipper ID
 *     responses:
 *       200:
 *         description: Restored
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Shipper restored successfully
 *       404:
 *         description: Shipper not found
 */

/**
 * @swagger
 * /api/v1/shippers/{id}:
 *   get:
 *     summary: Get shipper by id
 *     tags: [Shippers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Shipper ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 shipper_id: 1
 *                 company_name: Speedy Express
 *                 phone: (503) 555-9831
 *       404:
 *         description: Shipper not found
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/shippers:
 *   post:
 *     summary: Create shipper
 *     tags: [Shippers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             companyName: New Shipper
 *             phone: (503) 555-1234
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 shipper_id: 4
 *                 company_name: New Shipper
 *                 phone: (503) 555-1234
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/shippers/{id}:
 *   put:
 *     summary: Update shipper
 *     tags: [Shippers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Shipper ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             companyName: Updated Shipper
 *             phone: (503) 555-9999
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 shipper_id: 1
 *                 company_name: Updated Shipper
 *                 phone: (503) 555-9999
 *       404:
 *         description: Shipper not found
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/shippers/{id}:
 *   delete:
 *     summary: Delete shipper (soft delete)
 *     tags: [Shippers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Shipper ID
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Shipper deleted successfully
 *       404:
 *         description: Shipper not found
 */
