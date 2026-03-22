/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categories management
 */

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories name
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - category_id: 1
 *                   category_name: Beverages
 *                   description: Soft drinks, coffees, teas, beers, and ales
 *                 - category_id: 2
 *                   category_name: Condiments
 *                   description: Sweet and savory sauces, relishes, spreads, and seasonings
 *               meta:
 *                 total: 8
 *                 page: 1
 *                 totalPages: 1
 *                 limit: 10
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 category_id: 1
 *                 category_name: Beverages
 *                 description: Soft drinks, coffees, teas, beers, and ales
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Category not exists
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/categories:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             categoryName: New Category
 *             description: A new category
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 category_id: 9
 *                 category_name: New Category
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Categories]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             categoryName: Updated Category
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 category_id: 9
 *                 category_name: Updated Category
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *          type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 category_id: 9
 *                 is_deleted: true
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Category not exists
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/categories/deleted_categories:
 *   get:
 *     summary: Get all deleted categories
 *     tags: [Categories]
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
 *                 - category_id: 10
 *                   category_name: Old Category
 *                   is_deleted: true
 *       404:
 *         description: No deleted categories
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: No one is deleted for this moment
 */

/**
 * @swagger
 * /api/v1/categories/restore/{id}:
 *   patch:
 *     summary: Restore deleted category
 *     tags: [Categories]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Restored
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 category_id: 10
 *                 is_deleted: false
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /api/v1/categories/{id}/products:
 *   get:
 *     summary: Get all products by category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
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
 *                   unit_price: 18
 *                   units_in_stock: 39
 *                   company_name: Exotic Liquids
 *                 - category_name: Beverages
 *                   product_id: 2
 *                   product_name: Chang
 *                   unit_price: 19
 *                   units_in_stock: 17
 *                   company_name: Exotic Liquids
 *               meta:
 *                 total: 19
 *                 page: 1
 *                 totalPages: 2
 *                 limit: 10
 *       404:
 *         description: Category not found
 *       400:
 *         description: Validation error
 */
