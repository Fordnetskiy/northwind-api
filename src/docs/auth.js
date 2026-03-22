/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth module
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: fJ1Xk@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password
 *     responses:
 *       201:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: {
 *                 email: fJ1Xk@example.com
 *               }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid email or password!"
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: fJ1Xk@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data: {
 *                 email: fJ1Xk@example.com
 *               }
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Invalid email or password!"
 */
