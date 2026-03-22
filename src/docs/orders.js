/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders management
 */

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
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
 *                 - order_id: 10248
 *                   customer_id: VINET
 *                   customer_company: Vins et alcools Chevalier
 *                   employee: Steven Buchanan
 *                   order_date: 2024-07-04
 *                   required_date: 2024-08-01
 *                   shipped_date: 2024-07-16
 *                   shipper: Federal Shipping
 *                   freight: 32.38
 *                   ship_address: 59 rue de l'Abbaye
 *                   ship_city: Reims
 *                   ship_country: France
 *                   ship_postal_code: 51100
 *               meta:
 *                 total: 830
 *                 page: 1
 *                 totalPages: 83
 *                 limit: 10
 *       400:
 *         description: Validation error or page out of range
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: There is 83 pages only, not more
 */

/**
 * @swagger
 * /api/v1/orders/my:
 *   get:
 *     summary: Get all orders by authorized customer
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
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
 *                 - order_id: 10248
 *                   customer_id: VINET
 *                   customer_company: Vins et alcools Chevalier
 *                   employee: Steven Buchanan
 *                   order_date: 2024-07-04
 *                   required_date: 2024-08-01
 *                   shipped_date: 2024-07-16
 *                   shipper: Federal Shipping
 *                   freight: 32.38
 *                   ship_address: 59 rue de l'Abbaye
 *                   ship_city: Reims
 *                   ship_country: France
 *                   ship_postal_code: 51100
 *               meta:
 *                 total: 830
 *                 page: 1
 *                 totalPages: 83
 *                 limit: 10
 *       400:
 *         description: Validation error or page out of range
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: There is 83 pages only, not more
 */

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get order by id
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 order_id: 10248
 *                 customer_id: VINET
 *                 customer_company: Vins et alcools Chevalier
 *                 employee: Steven Buchanan
 *                 order_date: 2024-07-04
 *                 required_date: 2024-08-01
 *                 shipped_date: 2024-07-16
 *                 shipper: Federal Shipping
 *                 freight: 32.38
 *                 ship_address: 59 rue de l'Abbaye
 *                 ship_city: Reims
 *                 ship_country: France
 *                 ship_postal_code: 51100
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found/exists
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/orders/my/{id}:
 *   get:
 *     summary: Get order by id by authorized customer
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 order_id: 10248
 *                 customer_id: VINET
 *                 customer_company: Vins et alcools Chevalier
 *                 employee: Steven Buchanan
 *                 order_date: 2024-07-04
 *                 required_date: 2024-08-01
 *                 shipped_date: 2024-07-16
 *                 shipper: Federal Shipping
 *                 freight: 32.38
 *                 ship_address: 59 rue de l'Abbaye
 *                 ship_city: Reims
 *                 ship_country: France
 *                 ship_postal_code: 51100
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found/exists
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create order with order details
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             customerId: VINET
 *             employeeId: 5
 *             shipper: 2
 *             freight: 32.38
 *             address: 59 rue de l'Abbaye
 *             city: Reims
 *             country: France
 *             postalCode: 51100
 *             productId: 11
 *             quantity: 12
 *     responses:
 *       201:
 *         description: Order created with order details and stock updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 order_id: 11078
 *                 customer_id: VINET
 *                 employee_id: 5
 *                 order_date: 2024-03-11
 *                 required_date: 2024-03-18
 *                 ship_via: 2
 *                 freight: 32.38
 *                 ship_name: Vins et alcools Chevalier
 *                 ship_address: 59 rue de l'Abbaye
 *                 ship_city: Reims
 *                 ship_country: France
 *                 ship_postal_code: 51100
 *               price: 14.00
 *               quantity: 12
 *               totalPrice: 168
 *       400:
 *         description: Validation error or not enough stock
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not enough stock!
 */

/**
 * @swagger
 * /api/v1/orders/my:
 *   post:
 *     summary: Create order with order details by authorized customer
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             employeeId: 5
 *             shipper: 2
 *             freight: 32.38
 *             address: 59 rue de l'Abbaye
 *             city: Reims
 *             country: France
 *             postalCode: 51100
 *             productId: 11
 *             quantity: 12
 *     responses:
 *       201:
 *         description: Order created with order details and stock updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 order_id: 11078
 *                 customer_id: Your id from token
 *                 employee_id: 5
 *                 order_date: 2024-03-11
 *                 required_date: 2024-03-18
 *                 ship_via: 2
 *                 freight: 32.38
 *                 ship_name: Vins et alcools Chevalier
 *                 ship_address: 59 rue de l'Abbaye
 *                 ship_city: Reims
 *                 ship_country: France
 *                 ship_postal_code: 51100
 *               price: 14.00
 *               quantity: 12
 *               totalPrice: 168
 *       400:
 *         description: Validation error or not enough stock
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Not enough stock!
 */

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   put:
 *     summary: Update order
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             requiredDate: 2024-04-01
 *             shipper: 1
 *             address: 59 rue de l'Abbaye
 *             city: Reims
 *             region: null
 *             postalCode: 51100
 *             country: France
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 order_id: 10248
 *                 required_date: 2024-04-01
 *                 ship_via: 1
 *                 ship_address: 59 rue de l'Abbaye
 *                 ship_city: Reims
 *                 ship_region: null
 *                 ship_postal_code: 51100
 *                 ship_country: France
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found/exists
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/orders/my/{id}:
 *   put:
 *     summary: Update order by authorized customer
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             requiredDate: 2024-04-01
 *             shipper: 1
 *             address: 59 rue de l'Abbaye
 *             city: Reims
 *             region: null
 *             postalCode: 51100
 *             country: France
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 order_id: 10248
 *                 required_date: 2024-04-01
 *                 ship_via: 1
 *                 ship_address: 59 rue de l'Abbaye
 *                 ship_city: Reims
 *                 ship_region: null
 *                 ship_postal_code: 51100
 *                 ship_country: France
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found/exists
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     summary: Delete order and restore product stock
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order and order details deleted, product stock restored
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order was deleted!
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found/exists
 */

/**
 * @swagger
 * /api/v1/orders/my/{id}:
 *   delete:
 *     summary: Delete order and restore product stock by authorized customer
 *     tags: [Orders]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order and order details deleted, product stock restored
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Order was deleted!
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Order not found/exists
 */
