const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
    },
    apis: [path.join(process.cwd(),'./src/routers/*.ts')], // Specify the paths to your TypeScript code files
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);