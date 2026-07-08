const express = require("express");
const authRoutes = require('./Routes/authRoutes')
const departmentRoutes = require('./Routes/departmentRoutes')
const employeeRoutes = require('./Routes/employeeRoutes')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const dbConnect = require('./config/db');
dbConnect();

// auth Routes
app.use('/api/auth', authRoutes);

// department Routes
app.use('/api/department', departmentRoutes);

//employee Routes
app.use('/api/employee', employeeRoutes);

// Error middleware 
app.use(errorMiddleware);


