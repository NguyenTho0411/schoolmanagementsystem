// backend/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'School Management API',
            version: '1.0.0',
            description: 'API documentation for School Management System',
        },
        servers: [
            {
                url: 'http://localhost:5000', // Đổi lại port nếu khác
            },
        ],
    },
    apis: ['./routes/*.js', './models/*.js'], // Tự động scan các file này lấy doc
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
