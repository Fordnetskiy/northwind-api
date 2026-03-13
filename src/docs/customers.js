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
 *               data:
 *                 - customer_id: ALFKI
 *                   company_name: Alfreds Futterkiste
 *                   contact_name: Maria Anders
 *                   contact_title: Sales Representative
 *                   address: Obere Str. 57
 *                   city: Berlin
 *                   region: null
 *                   postal_code: "12209"
 *                   country: Germany
 *                   phone: 030-0074321
 *                   fax: 030-0076545
 *                   is_deleted: false
 *               meta:
 *                 total: 91
 *                 page: 1
 *                 totalPages: 10
 *                 limit: 10
 *       404:
 *         description: Page out of range or customers not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Page 5 not found. Total pages available: 10"
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
 *               data:
 *                 - customer_id: ALFKI
 *                   company_name: Alfreds Futterkiste
 *                   contact_name: Maria Anders
 *                   is_deleted: true
 *       404:
 *         description: No deleted customers
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No one is deleted for this moment
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
 *           minLength: 5
 *           maxLength: 5
 *         description: "Customer ID (e.g. ALFKI)"
 *     responses:
 *       200:
 *         description: Restored
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 customer_id: ALFKI
 *                 is_deleted: false
 *       404:
 *         description: Customer not found or not deleted
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Customer not found, or not deleted
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
 *         description: "Customer ID (e.g. ALFKI)"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 customer:
 *                   customer_id: ALFKI
 *                   company_name: Alfreds Futterkiste
 *                   contact_name: Maria Anders
 *                   contact_title: Sales Representative
 *                   address: Obere Str. 57
 *                   city: Berlin
 *                   region: null
 *                   postal_code: "12209"
 *                   country: Germany
 *                   phone: 030-0074321
 *                   fax: 030-0076545
 *                   is_deleted: false
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Customer not exists
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
 *             customerId: NEWCU
 *             companyName: New Company
 *             contactName: John Doe
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 customer_id: NEWCU
 *                 company_name: New Company
 *                 contact_name: John Doe
 *                 contact_title: null
 *                 address: null
 *                 city: null
 *                 region: null
 *                 postal_code: null
 *                 country: null
 *                 phone: null
 *                 fax: null
 *                 is_deleted: false
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
 *           minLength: 5
 *           maxLength: 5
 *         description: "Customer ID (e.g. ALFKI)"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             companyName: Alfreds Futterkiste
 *             contactName: Maria Anders
 *             contactTitle: Sales Representative
 *             address: Obere Str. 57
 *             city: Berlin
 *             region: null
 *             postalCode: "12209"
 *             country: Germany
 *             phone: 030-0074321
 *             fax: 030-0076545
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 customer_id: ALFKI
 *                 company_name: Alfreds Futterkiste
 *                 contact_name: Maria Anders
 *                 contact_title: Sales Representative
 *                 address: Obere Str. 57
 *                 city: Berlin
 *                 region: null
 *                 postal_code: "12209"
 *                 country: Germany
 *                 phone: 030-0074321
 *                 fax: 030-0076545
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Customer not found for update!
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
 *           minLength: 5
 *           maxLength: 5
 *         description: "Customer ID (e.g. ALFKI)"
 *     responses:
 *       200:
 *         description: Soft deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 customer_id: ALFKI
 *                 is_deleted: true
 *       404:
 *         description: Customer not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Customer not found
 */
