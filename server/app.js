const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./routers/router')
const app = express();
const port = 3000;

// Конфигурация Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Описание вашего API'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  explorer: true,
  path:'./docs/docs.yaml',
  apis: ['./docs/docs.yaml'] // Укажите путь к файлам с определениями маршрутов
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router)

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});