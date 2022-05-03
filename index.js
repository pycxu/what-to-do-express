// Import packages
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Load env variable
require('dotenv').config();
// App
const app = express();
// Morgan
app.use(morgan('tiny'));
// Cors
app.use(cors());
// First route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index.routes'));

// Starting server
app.listen(process.env.PORT);
