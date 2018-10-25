/**
 * notesRouter.js
 */
const express = require('express');
const router = express.Router(); //eslint-disable-line
const notes = [{ id: 1, title: 'foo', description: 'bar' }];

router.get('/', (req, res, next) => {
  res.json(notes);
});

router.get('/:id', (req, res) => {
  let note = {};
  note = notes.find(notes => notes.id === req.params.id);
  res.json(note);
});

router.post('/', (req, res) => {
  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title: req.body.title,
    description: req.body.description
  };

  notes.push(newNote);

  res.json(notes);
});

router.put('/:id', (req, res) => {
  const id = req.params.id;

  for(let i = 0; i < notes.length; i++) {
    if(notes[i].id === id) {
      notes[i].title = req.body.title;
      notes[i].description = req.body.description;
      break;
    }
  }

  res.json(notes);
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const newNotes = notes.filter(note => Number(note.id) !== Number(id));
  res.json(newNotes);
});

module.exports = router;
