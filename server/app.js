const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const router = require('./routers/router');
const sequelize = require('./config/sequelize_instance');
const chatController = require('./controllers/ChatController');
const cors = require('cors');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174", // Разрешите клиенту подключаться
    methods: ["GET", "POST"],
  },
});

// Настройка CORS и JSON
app.use(cors());
app.use(express.json());

// Настройка Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'Описание вашего API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  explorer: true,
  path: './docs/docs.yaml',
  apis: ['./docs/docs.yaml'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Использование маршрутов
app.use('/api', router);

// Подключение Socket.IO
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  chatController.onConnection(socket);
});

// Запуск сервера
server.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the PostgreSQL database has been established successfully.');
    console.log(`Сервер запущен на порту ${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
