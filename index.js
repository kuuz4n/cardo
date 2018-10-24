/**
 * @description
 * Entry file for The Province Man's Web App
 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const notesRouter = require('./server/routers/notesRouter');
const aboutRouter = require('./server/routers/aboutRouter');
const indexRouter = require('./server/routers/indexRouter');
const port = 3300;

app.use(morgan('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.viewModel = {
    title: 'Card - Note Taking App'
  };
  next();
});

app.use(express.static('public'));

// NOTE: The __dirname is important for setting up the directory of the views
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/api/notes', notesRouter);

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});
