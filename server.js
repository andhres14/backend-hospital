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

// Routes
app.use('/api/v1/users', require('./routes/users.route'));
app.use('/api/v1/login', require('./routes/auth.route'));
app.use('/api/v1/hospitals', require('./routes/hospitals.route'));
app.use('/api/v1/medics', require('./routes/medics.route'));
app.use('/api/v1/search', require('./routes/searchs.route'));
app.use('/api/v1/uploads', require('./routes/upload.route'));

/*var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serveIndex(__dirname + '/uploads'));*/

app.listen(portDB, () => console.log(`Server listening on port ${ portDB }`));
