// src/docs/employees.js

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Employees management
 */

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
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
 *                 - id: 1
 *                   fullName: Mr. Steven Buchanan
 *                   title: Sales Manager
 *                   city: London
 *                   country: UK
 *                   home_phone: (71) 555-4848
 *               meta:
 *                 total: 9
 *                 page: 1
 *                 totalPages: 1
 *                 limit: 10
 *       400:
 *         description: Page out of range
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Page 5 not found. Total pages available: 1"
 *       404:
 *         description: Employers list is empty
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Employers list are empty!"
 */

/**
 * @swagger
 * /api/v1/employees/restore/{id}:
 *   post:
 *     summary: Restore deleted employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Restored
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 employee_id: 1
 *                 first_name: Steven
 *                 last_name: Buchanan
 *                 title: Sales Manager
 *                 city: London
 *                 country: UK
 *                 is_deleted: false
 *       404:
 *         description: Employee not found or not deleted
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Employer not found or not deleted"
 */

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get employee by id
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 id: 1
 *                 fullName: Mr. Steven Buchanan
 *                 title: Sales Manager
 *                 city: London
 *                 country: UK
 *                 home_phone: (71) 555-4848
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Employer not finded/exist"
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     summary: Create employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstName: Steven
 *             lastName: Buchanan
 *             courtesyTitle: Mr.
 *             title: Sales Manager
 *             city: London
 *             country: UK
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 employee_id: 10
 *                 first_name: Steven
 *                 last_name: Buchanan
 *                 title: Sales Manager
 *                 title_of_courtesy: Mr.
 *                 city: London
 *                 country: UK
 *                 is_deleted: false
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             firstName: Steven
 *             lastName: Buchanan
 *             courtesyTitle: Mr.
 *             title: Sales Manager
 *             birthDate: 1955-03-04
 *             hireDate: 1993-10-17
 *             address: 14 Garrett Hill
 *             city: London
 *             region: null
 *             postalCode: SW1 8JR
 *             country: UK
 *             phone: (71) 555-4848
 *             extension: 3453
 *             notes: Steven Buchanan graduated from St. Andrews University
 *             reportsTo: 2
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 employee_id: 1
 *                 first_name: Steven
 *                 last_name: Buchanan
 *                 title: Sales Manager
 *                 title_of_courtesy: Mr.
 *                 birth_date: 1955-03-04
 *                 hire_date: 1993-10-17
 *                 address: 14 Garrett Hill
 *                 city: London
 *                 region: null
 *                 postal_code: SW1 8JR
 *                 country: UK
 *                 home_phone: (71) 555-4848
 *                 extension: 3453
 *                 notes: Steven Buchanan graduated from St. Andrews University
 *                 reports_to: 2
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Employer not found/exist!"
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete employee (soft delete)
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Soft deleted
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 employee_id: 1
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Employer not exist"
 */

/**
 * @swagger
 * /api/v1/employees/{id}/orders:
 *   get:
 *     summary: Get all orders by employee
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
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
 *                   employee_name: Steven Buchanan
 *                   order_date: 2024-07-04
 *                   required_date: 2024-08-01
 *                   shipped_date: 2024-07-16
 *                   freight: 32.38
 *                   ship_city: Reims
 *                   ship_country: France
 *                   product_id: 11
 *                   quantity: 12
 *               meta:
 *                 total: 42
 *                 page: 1
 *                 totalPages: 5
 *                 limit: 10
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Employee not found!"
 *       400:
 *         description: Page out of range
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Page 5 not found. Total pages available: 4"
 */
