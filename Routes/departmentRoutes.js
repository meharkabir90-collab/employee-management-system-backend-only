const express = require('express');
const router = express.Router();
const {  createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment } = require('../controller/departmentController');
const authMiddleware = require('../middleware/authMiddleware');
const  { adminMiddleware }  = require('../middleware/adminMiddleware');

console.log(createDepartment);
console.log(authMiddleware);
console.log(adminMiddleware);


/**
 * @swagger
 * /api/department/:
 *   post:
 *     summary: Register a new Department
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Computer Science
 *               description:
 *                 type: string
 *                 example: Focusing on developing problem solving and software development skills.
 *     responses:
 *       200:
 *         description: Registered successfully
 *       400:
 *         description: Bad Request
 */
router.post("/", authMiddleware, adminMiddleware, createDepartment);



/**
 * @swagger
 * /api/department/{id}:
 *   put:
 *     summary: Update a Department
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: string
 *           example: 6870f6d8b4e6c1f8a1234567
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       404:
 *         description: Department not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authMiddleware, adminMiddleware, updateDepartment);



/**
 * @swagger
 * /api/department/{id}:
 *   delete:
 *     summary: Delete a Department
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: string
 *           example: 6870f6d8b4e6c1f8a1234567
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteDepartment);



/**
 * @swagger
 * /api/department/:
 *   get:
 *     summary:  Read Existing Departments
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Departments get successfully
 *       400:
 *         description: Bad Request
 */
router.get("/", authMiddleware, getDepartments);

/**
 * @swagger
 * /api/department/{id}:
 *   get:
 *     summary: Get a department by ID
 *     tags: [Department]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Department ID
 *         schema:
 *           type: string
 *           example: 6870f6d8b4e6c1f8a1234567
 *     responses:
 *       200:
 *         description: Department retrieved successfully
 *       404:
 *         description: Department not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleware, getDepartmentById);

module.exports = router;
