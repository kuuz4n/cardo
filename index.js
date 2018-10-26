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
const notes = [];

//- Middleware: Logs the request to the server
//- the 'dev' is formatted as ":http_verb :url :status_code :response_time ms - :res[content-length]"
//- e.g. GET / 304 602.566 ms - -
//- READ More: https://www.npmjs.com/package/morgan
app.use(morgan('dev'));

// Middleware: Parses the value on the request body and then interprets its value
//             so you can use it as req.body
// e.g. req.body.title
//      req.body.content
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware: To serve static files such as images, CSS files, and JavaScript files
//             found in the public folder
// e.g. public/cardo.jpg is accessed as http://localhost:3300/cardo.jpg
//      public/images/cardo.jpg is accessed as http://localhost:3300/images/cardo.jpg
//
// READ More: http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// Custom Middleware: Sets the req.viewModel as an object
//                    so that we can use it on all our routers.
// Purpose: So we do not have to redeclare the title on all our pages.
app.use((req, res, next) => {
  req.viewModel = {
    title: 'Card - Note Taking App',
    notes: notes
  };
  next();
});

// Sets our templating engine for views is Pug and its target directory
// NOTE: The __dirname is a global Node.js variable important for setting up the directory of the views
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'pug');

// Note: The order must be maintained here
app.use('/', indexRouter);
app.get('/notes/:id', (req, res) => {
  let viewModel = req.viewModel;
  viewModel.id = req.params.id;
  viewModel.selectedNote = notes.find(n => Number(n.id) === Number(req.params.id));

  res.render('notes', viewModel);
});
app.use('/about', aboutRouter);
app.use('/api/notes', notesRouter);

app.listen(port, (err) => {
  if(err) { return console.error(err); }
  console.log(`Listening to ${port}...`);
});
