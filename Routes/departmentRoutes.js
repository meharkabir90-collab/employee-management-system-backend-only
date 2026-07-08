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

router.post("/", authMiddleware, adminMiddleware, createDepartment);
router.put("/:id", authMiddleware, adminMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, adminMiddleware, deleteDepartment);

router.get("/", authMiddleware, getDepartments);
router.get("/:id", authMiddleware, getDepartmentById);

module.exports = router;
