require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { dbConnection } = require('./database/config')
const portDB = process.env.PORT || 3005;

// create express server
const app = express();

// CORS configure
app.use(cors());

dbConnection();

// routes example
app.get('/', (req, res) => {
    return res.status(200)
        .json({
            'success': true,
            'message': 'Ok'
        });
});

app.listen(portDB, () => {
    console.log(`Server listening on port ${portDB}`)
});
