const dotenv = require('dotenv');
dotenv.config();


const express = require("express");
const authRoutes = require('./Routes/authRoutes')
const departmentRoutes = require('./Routes/departmentRoutes')
const employeeRoutes = require('./Routes/employeeRoutes')
const errorMiddleware = require('./middleware/errorMiddleware')

const swaggerSpec = require('./config/swagger')
const swaggerUi = require('swagger-ui-express')

const swaggerOptions = {
  explorer: true,
}



const app = express();
app.use(express.json());





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

//swagger documentation
//swagger documentation
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerOptions)
);

app.get("/", (req, res) => {
    res.send("Employee Management API Running");
});

app.get("/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});

// Error middleware 
app.use(errorMiddleware);







