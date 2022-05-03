// Import packages
const express = require('express');
const morgan = require('morgan');
// Load env variable
require('dotenv').config();
// App
const app = express();
// Morgan
app.use(morgan('tiny'));
// First route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index.routes'));

// Starting server
app.listen(process.env.PORT);
