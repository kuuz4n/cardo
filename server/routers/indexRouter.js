/**
 * indexRouter
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const SimpleJsonStore = require('simple-json-store');

// Initializes the data-2.json file with notes as its initial value if empty
const store = new SimpleJsonStore('./data-2.json', { notes: [] });

router.get('/', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
  // We can extend the viewModel and add new properties
  // e.g. viewModel.appName = 'Cardo';
  //      viewModel.count = 10;
  //      viewModel.choices = ['apple', 'orange', 'grapes'];
  // Read more: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
  viewModel.notes = store.get('notes');
  res.render('index.pug', viewModel);
});

router.post('/', function submitNotes(req, res) {
  // Process: Get notes from json -> Add new note -> Save the notes
  let notes = store.get('notes');
  notes.push({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  store.set('notes', notes);

  //- It just reload the page on /
  // More on redirection: https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
  res.redirect('/');
});

module.exports = router;
