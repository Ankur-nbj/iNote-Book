const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all the notes using GET "api/notes/fetchallnotes" - Requires user to be authenticated
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // Fetch all notes that belong to the authenticated user
    const notes = await Note.find({ user: req.user.id });
    // Respond with the notes in JSON format
    res.json(notes);
  } catch (error) {
    // Log any errors that occur and respond with a 500 status
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// ROUTE 2: Add new notes using POST "api/notes/addnotes" - Requires user to be authenticated
router.post(
  "/addnotes",
  fetchuser,
  [
    // Validation rules for the request body
    body('title', 'Enter a Title').isLength({ min: 3 }),
    body('description', 'Write Description').isLength({ min: 5 })
  ],
  async (req, res) => {
    // Extract title, description, and tag from the request body
    const { title, description, tag } = req.body;

    // Validate the request body against the validation rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If validation fails, respond with a 400 status and the validation errors
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      // Create a new note with the data from the request and the authenticated user's ID
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      // Save the new note to the database
      const savedNote = await note.save();
      // Respond with the saved note in JSON format
      res.json(savedNote);
    } catch (error) {
      // Log any errors that occur and respond with a 500 status
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE 3: Update an existing note using PUT "api/notes/updatenote/:id" - Requires user to be authenticated
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    // Extract title, description, and tag from the request body
    const { title, description, tag } = req.body;
    
    // Create a new note object to hold the updates
    const newNote = {};
    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tag) { newNote.tag = tag; }

    try {
      // Find the note by ID
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // Ensure the user owns the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      // Update the note
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// ROUTE 4: Delete an existing note using DELETE "api/notes/deletenote/:id" - Requires user to be authenticated
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    try {
      // Find the note by ID
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // Ensure the user owns the note
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      // Delete the note
      await Note.findByIdAndDelete(req.params.id);
      res.json({ message: "Note Deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
