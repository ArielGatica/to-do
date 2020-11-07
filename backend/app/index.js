const express = require('express');
const app = express();
const { connectDB } = require('./database/db');
const morgan = require('morgan');
const cors = require('cors');
const config = require('./config/config');
const routesUsers = require('./routes/users.routes');
const routesTasks = require('./routes/tasks.routes');
const routesAuth = require('./routes/auth.routes');

// Environment var
const node_env = process.env.NODE_ENV || 'dev';
const PORT = config[node_env].server_port;

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.disable('etag');

// Connect to MongoDB
connectDB();

// Routes server
app.use('/api/v1/users', routesUsers);
app.use('/api/v1/tasks', routesTasks);
app.use('/api/v1/auth', routesAuth);

// API running port
app.listen(PORT, () =>{ console.log(`API-Backend running port: ${PORT}`) })