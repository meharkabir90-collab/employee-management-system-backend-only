const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/authMiddleware');
const  { adminMiddleware }  = require('../Middleware/adminMiddleware');
const { createEmployee,
     getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require('../controller/employeeController');
     


router.post("/", authMiddleware, adminMiddleware, createEmployee);

router.get("/", authMiddleware, getEmployees);

router.get("/:id", authMiddleware, getEmployeeById);

router.put("/:id", authMiddleware, adminMiddleware, updateEmployee);

router.delete("/:id", authMiddleware, adminMiddleware, deleteEmployee);


module.exports = router;




