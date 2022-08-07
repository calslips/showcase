const express = require('express');
const morgan = require('morgan')
require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');

connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
});