// src/docs/suppliers.js

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Suppliers management
 */

/**
 * @swagger
 * /api/v1/suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
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
 *                 - supplier_id: 1
 *                   company_name: Exotic Liquids
 *                   contact_name: Charlotte Cooper
 *                   phone: (171) 555-2222
 *                   city: London
 *                   country: UK
 *               meta:
 *                 total: 29
 *                 page: 1
 *                 totalPages: 3
 *                 limit: 10
 *       400:
 *         description: Page out of range
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: There is 3 pages only, not more
 */

/**
 * @swagger
 * /api/v1/suppliers/restore/{id}:
 *   patch:
 *     summary: Restore deleted supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Restored
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 supplier_id: 1
 *                 is_deleted: false
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Supplier not found!
 */

/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   get:
 *     summary: Get supplier by id
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 supplier_id: 1
 *                 company_name: Exotic Liquids
 *                 contact_name: Charlotte Cooper
 *                 contact_title: Purchasing Manager
 *                 address: 49 Gilbert St.
 *                 city: London
 *                 region: null
 *                 postal_code: EC1 4SD
 *                 country: UK
 *                 phone: (171) 555-2222
 *                 fax: null
 *                 homepage: null
 *                 is_deleted: false
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Supplier not found!
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/suppliers:
 *   post:
 *     summary: Create supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             supplierId: 30
 *             companyName: Exotic Liquids
 *             contactName: Charlotte Cooper
 *             contactTitle: Purchasing Manager
 *             address: 49 Gilbert St.
 *             city: London
 *             postalCode: EC1 4SD
 *             country: UK
 *             phone: (171) 555-2222
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 supplier_id: 30
 *                 company_name: Exotic Liquids
 *                 contact_name: Charlotte Cooper
 *                 contact_title: Purchasing Manager
 *                 address: 49 Gilbert St.
 *                 city: London
 *                 postal_code: EC1 4SD
 *                 country: UK
 *                 phone: (171) 555-2222
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   put:
 *     summary: Update supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             companyName: Exotic Liquids
 *             contactName: Charlotte Cooper
 *             contactTitle: Purchasing Manager
 *             address: 49 Gilbert St.
 *             city: London
 *             region: null
 *             postalCode: EC1 4SD
 *             country: UK
 *             phone: (171) 555-2222
 *             fax: null
 *             homepage: null
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 supplier_id: 1
 *                 company_name: Exotic Liquids
 *                 contact_name: Charlotte Cooper
 *                 contact_title: Purchasing Manager
 *                 address: 49 Gilbert St.
 *                 city: London
 *                 region: null
 *                 postal_code: EC1 4SD
 *                 country: UK
 *                 phone: (171) 555-2222
 *                 fax: null
 *                 homepage: null
 *       404:
 *         description: Supplier not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: Supplier not exists
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/suppliers/{id}:
 *   delete:
 *     summary: Delete supplier (soft delete)
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Soft deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: null
 */
