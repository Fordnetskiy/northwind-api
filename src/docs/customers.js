/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customers management
 */

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customers]
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
 *               data: []
 *               meta:
 *                 total: 91
 *                 page: 1
 *                 total_pages: 5
 *                 limit: 20
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/customers/deleted:
 *   get:
 *     summary: Get all deleted customers
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: []
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   get:
 *     summary: Get customer by id
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 5
 *           maxLength: 5
 *         description: Customer ID (e.g. ALFKI)
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 customer_id: ALFKI
 *                 company_name: Alfreds Futterkiste
 *                 contact_name: Maria Anders
 *                 country: Germany
 *       404:
 *         description: Customer not found
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/customers:
 *   post:
 *     summary: Create customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customer_id: NEWCU
 *             company_name: New Company
 *             contact_name: John Doe
 *             country: Ukraine
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   put:
 *     summary: Update customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             company_name: Updated Company
 *             contact_name: Jane Doe
 *             country: Ukraine
 *     responses:
 *       200:
 *         description: Updated
 *       404:
 *         description: Customer not found
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/customers/{id}:
 *   delete:
 *     summary: Delete customer (soft delete)
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Customer not found
 */

/**
 * @swagger
 * /api/v1/customers/restore/{id}:
 *   patch:
 *     summary: Restore deleted customer
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restored
 *       404:
 *         description: Customer not found
 */
