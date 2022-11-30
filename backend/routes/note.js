const express = require('express')
const router = express.Router();
const fetchuser = require('../middleWare/fetchuser.js')
const Notes = require('../models/notes');
const { route } = require('./auth.js');
const { body, validationResult } = require('express-validator');
const { Router } = require('express');

//get all notes using post  method 

router.post('/fetchallnotes', fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes)
})


//get add node
router.post('/addnote', fetchuser, [
  body('title', 'enter a valid name').isLength({ min: 3 }),
  body('description', 'enter atleast 5 character ').isLength({ min: 5 })
], async (req, res) => {

  try {
    console.log("add is calling")
    const errors = validationResult(req)
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }) }
    const { title, description, tag } = req.body;
    const notes = new Notes({
      title, description, tag, user: req.user.id
    })
    const savenote = await notes.save()
    res.json(savenote)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("some error")
  }
})

//update an existing note

router.put('/updateNote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note
    const newNote = {};
    console.log(title ,  description , tag)
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    const isExists = await Notes.findById(req.params.id);
    if (!isExists) {
      return res.status(404).send("not found")
    }
    if (req.user.id != isExists.user.toString()) {
      return res.status(401).send("unautherized....")
    }
    const note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
  } catch (error) {
    console.log(error.message)
    res.status(500).send("some error")
  }
})


router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //create a new note
    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found")
    }
    if (req.user.id != note.user.toString()) {
      return res.status(401).send("unautherized....")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "success": "Note has been deleted" })
  } catch (error) {
    console.log(error.message)
    res.status(500).send("some error")
  }
})



module.exports = router;