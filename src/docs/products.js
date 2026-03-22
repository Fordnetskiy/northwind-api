/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Products management
 */

/**
 * @swagger
 * /api/v1/products/stats:
 *   get:
 *     summary: Get products statistics
 *     tags: [Products]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - total_products: 77
 *                   minimum_price: 2.50
 *                   maximum_price: 263.50
 *                   average_price: 29
 *                   sum_of_prices: 2222.71
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
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
 *                 - category_name: Beverages
 *                   product_id: 1
 *                   product_name: Chai
 *                   unit_price: 18.00
 *                   units_in_stock: 39
 *                   company_name: Exotic Liquids
 *               meta:
 *                 total: 77
 *                 page: 1
 *                 totalPages: 8
 *                 limit: 10
 *       400:
 *         description: Validation error or page out of range
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: There is 8 pages only, not more
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Get product by id
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 category_name: Beverages
 *                 product_id: 1
 *                 product_name: Chai
 *                 unit_price: 18.00
 *                 units_in_stock: 39
 *                 company_name: Exotic Liquids
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Product not exists
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create product
 *     tags: [Products]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productId: 78
 *             productName: New Product
 *             supplierId: 1
 *             categoryId: 1
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 product_id: 78
 *                 product_name: New Product
 *                 supplier_id: 1
 *                 category_id: 1
 *                 unit_price: null
 *                 units_in_stock: null
 *                 is_deleted: false
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update product
 *     tags: [Products]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             productName: Updated Chai
 *             supplierId: 1
 *             categoryId: 1
 *             unitPrice: 20.00
 *             unitsInStock: 50
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               succes: true
 *               data:
 *                 product_id: 1
 *                 product_name: Updated Chai
 *                 supplier_id: 1
 *                 category_id: 1
 *                 unit_price: 20.00
 *                 units_in_stock: 50
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Product not found
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete product (soft delete)
 *     tags: [Products]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Soft deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 product_id: 1
 *                 product_name: Chai
 *                 is_deleted: true
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Product not exists!
 */
