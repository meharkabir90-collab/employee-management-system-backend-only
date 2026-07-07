const Joi = require("joi");
const Employee = require('../models/Employee');
const Department = require("../models/Department");


// Create Employee
// =======================

   console.log("Resolved Path:", require.resolve("../models/Employee"));
console.log("Employee:", Employee);
const createEmployee = async (req, res, next) => {
    try {

        // Validate Request
        const schema = Joi.object({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(10).max(15).required(),
            position: Joi.string().required(),
            salary: Joi.number().required(),
            department: Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return next(error);
        }

        const {
            name,
            email,
            phone,
            position,
            salary,
            department
        } = req.body;

     

        // Check Duplicate Email
        const employeeExists = await Employee.findOne({ email });

        if (employeeExists) {
            return next({
                status: 409,
                message: "Employee email already exists"
            });
        }

        

        // Check Department Exists
        const departmentExists = await Department.findById(department);

        if (!departmentExists) {
            return next({
                status: 404,
                message: "Department not found"
            });
        }

        // Create Employee
        const employee = await Employee.create({
            name,
            email,
            phone,
            position,
            salary,
            department
        });

        return res.status(201).json({
            success: true,
            message: "Employee created successfully",
            employee
        });

    } catch (err) {
        next(err);
    }
};


// =======================
// Get All Employees
// Search + Filter
// =======================
const getEmployees = async (req, res, next) => {
       


    try {
          console.log("Query Params:", req.query);
        const { search, department } = req.query;
           console.log("Search:", search);
        console.log("Department:", department);

        

        let query = {};

        // Search by Name OR Email
        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        // Filter by Department
        if (department) {
            query.department = department;
        }
        console.log("Mongo Query:", query);

        const employees = await Employee.find(query)
            .populate("department", "name")
            .sort({ createdAt: -1 });

         

        return res.status(200).json({
            success: true,
            totalEmployees: employees.length,
            employees
        });

    } catch (err) {
        next(err);
    }
};


const getEmployeeById = async (req, res, next) => {
    try {

        const employee = await Employee.findById(req.params.id)
            .populate("department", "name");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            employee
        });

    } catch (err) {
        next(err);
    }
};


//Update
const updateEmployee = async (req, res, next) => {
    try {

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            employee
        });

    } catch (err) {
        next(err);
    }
};


//Delete
const deleteEmployee = async (req, res, next) => {
    try {

        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully"
        });

    } catch (err) {
        next(err);
    }
};

 module.exports = { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee  };