const express = require('express');
const morgan = require('morgan')
require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');
const { engine } = require('express-handlebars');

connectDB();
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
});