const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Employee Management API",
            version: "1.0.0",
            description: "API documentation for Employee Management System",
        },
        servers: [
            {
            url: "http://localhost:5000",
            },
            {
            url: "https://employee-management-s-backend.vercel.app/",
            },
            
        ],

        components: {
            securitySchemes: {
            bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
        },
       },
      },
    },
    apis: ["./routes/*.js"]




};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;