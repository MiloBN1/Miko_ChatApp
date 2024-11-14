const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./routers/router')
const app = express();
const port = 3000;
const sequelize = require('./config/sequelize_instance')

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
  apis: ['./docs/docs.yaml'] 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(router)

app.listen(port, async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the PostgreSQL database has been established successfully.');
    console.log(`Сервер запущен на порту ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});