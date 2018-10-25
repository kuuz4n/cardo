/**
 * indexRouter
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line

router.get('/', function getIndexPage(req, res) {
  let viewModel = req.viewModel;
  // We can extend the viewModel and add new properties
  // e.g. viewModel.appName = 'Cardo';
  //      viewModel.count = 10;
  //      viewModel.choices = ['apple', 'orange', 'grapes'];
  // Read more: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
  console.log(viewModel.notes);
  res.render('index.pug', viewModel);
});

router.post('/', function submitNotes(req, res) {
  // Process: Get notes from json -> Add new note -> Save the notes
  let notes = req.viewModel.notes;
  notes.push({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author
  });
  //- It just reload the page on /
  // More on redirection: https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections
  res.redirect('/');
});

module.exports = router;
