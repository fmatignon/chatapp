
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
require('dotenv/config');

const app = express();
app.use(bodyParser.json());


// Import routes
// User routes
app.use('/user', require('./src/routes/user.routes'));

// Connect to DB
mongoose.connect(process.env.MONGO_URI,
() => console.log('connected'));

// Start listening and define the port
app.listen(3000);