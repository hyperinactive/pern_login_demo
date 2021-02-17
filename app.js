require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const authRouter = require('./routes/authRouter');
const dashboardRouter = require('./routes/dashboardRouter');
// auth routes
app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

module.exports = app;
