const fastify = require('fastify');
const fastifySwagger = require('@fastify/swagger');
const fastifyMultipart = require('@fastify/multipart');
const fastifySwaggerUi = require('@fastify/swagger-ui');
const fastifyCookie = require("@fastify/cookie");
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

const swaggerUiObject = require('../Infrastructure/swaggerUiObject.js');
const swaggerObject = require('../Infrastructure/swaggerObject.js');
const mainRoutes = require("./routes/index.js");
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const startMessageConsumer = require('./consumers/messageConsumer');
const socketHandler = require('./socket/socketHandler');
const dataSource = require('../Infrastructure/postgres');
const { logger } = require("../Infrastructure/logger.js");

// RabbitMQ helper
const { connectRabbitMQ } = require('../Infrastructure/rabbitmq.js');

dotenv.config();

const serverInitializer = async () => {
    const app = fastify({ logger: true });

    // Middleware
    app.register(fastifyCookie);
    app.register(fastifyMultipart);
    app.register(fastifySwagger, swaggerObject.options);
    app.register(fastifySwaggerUi, swaggerUiObject);

    // Root route
    app.get('/', async () => ({
        code: 200,
        status: 'OK',
        message: 'Fastify server is running',
    }));

    // Routes
    mainRoutes(app);
    app.register(userRoutes, { prefix: '/users' });
    app.register(authRoutes, { prefix: '/auth' });
    app.register(messageRoutes, { prefix: '/messages' });

    try {
        // Initialize DB
        await dataSource.initialize();
        logger.info('Database connected');

        // Initialize RabbitMQ
        await connectRabbitMQ();
        logger.info('RabbitMQ connected');

        // Wait for Fastify to be ready
        const port = process.env.SERVER_PORT || 3000;
        const host = process.env.SERVER_HOST || '0.0.0.0';

        await app.ready();  // wait for Fastify to be ready

        // attach Socket.IO to Fastify's internal server
        const io = new Server(app.server, { cors: { origin: "*" } });
        socketHandler(io);
        startMessageConsumer(io);

        // finally listen
        await app.listen({ port, host });
        console.log(`Server + Socket.IO running on http://${host}:${port}`);

    } catch (error) {
        logger.error('Startup error:', error);
        process.exit(1);
    }
};

module.exports = serverInitializer;
