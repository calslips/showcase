const express = require('express');
const morgan = require('morgan')
require('dotenv').config({ path: './config/.env' });
const connectDB = require('./config/db');
const { engine } = require('express-handlebars');
const routes = require('./routes/index');
const authRoutes = require('./routes/auth');
const entriesRoutes = require('./routes/entries');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const methodOverride = require('method-override');
const { editIcon, formatDate, select, stripTags, truncate } = require('./helpers/hbs');
require('./config/passport')(passport);

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.engine(
  '.hbs',
  engine({
    helpers: {
      editIcon,
      formatDate,
      select,
      stripTags,
      truncate
    },
    extname: '.hbs'
  })
);
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use('/', routes);
app.use('/auth', authRoutes);
app.use('/entries', entriesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`)
});