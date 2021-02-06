require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');

const portDB = process.env.PORT || 3005;

// create express server
const app = express();

// CORS configure
app.use(cors());

// Body parse
app.use(express.json());


dbConnection();

// routes example
app.use('/api/v1/users', require('./routes/users.route'));
app.use('/api/v1/login', require('./routes/auth.route'));


app.listen(portDB, () => console.log(`Server listening on port ${ portDB }`));
