const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const  { adminMiddleware }  = require('../middleware/adminMiddleware');
const { createEmployee,
     getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controller/employeeController');
     

/**
 * @swagger
 * /api/employee/:
 *   post:
 *     summary: Register a new Employee
 *     tags: [Employee]
 *     security:
 *         - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john1267@gmail.com
 *               phone:
 *                 type: string
 *                 example: 033300000012
 *               position:
 *                 type: string
 *                 example: junior developer
 *               salary:
 *                 type: number
 *                 example: 50000
 *               department:
 *                 type: string
 *                 example: 56789455465676
 *     responses:
 *       200:
 *         description: Employee Registered successfully
 *       400:
 *         description: Bad Request
 */
router.post("/", authMiddleware, adminMiddleware, createEmployee);



/**
 * @swagger
 * /api/employee/:
 *   get:
 *     summary:  Read Existing Exployees
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employees get successfully
 *       400:
 *         description: Bad Request
 */
router.get("/", authMiddleware, getEmployees);


/**
 * @swagger
 * /api/employee/{id}:
 *   get:
 *     summary: Get an Employee by ID
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *           example: 6870f6d8b4e6c1f8a1234567
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleware, getEmployeeById);


/**
 * @swagger
 * /api/employee/{id}:
 *   put:
 *     summary: Update an Employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *           example: 6870f6d8b4e6c1f8a1234567
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authMiddleware, adminMiddleware, updateEmployee);



/**
 * @swagger
 * /api/employee/{id}:
 *   delete:
 *     summary: Delete Employee
 *     tags: [Employee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Employee ID
 *         schema:
 *           type: string
 *           example: 6870f6d8b4e6c1f8a1234567
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteEmployee);


module.exports = router;




