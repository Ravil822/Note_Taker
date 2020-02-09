// Dependencies
// =============================================================
const express = require("express");
const path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 4000;


// Sets up the Express app to handle data parsing
// =============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Basic HTML route 
// =============================================================
  app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  app.get("/assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, "public/assets/css/styles.css"));
  });

  app.get("/assets/js/index.js", function (req, res) {
    res.sendFile(path.join(__dirname, "public/assets/js/index.js"));
  });


  // Route display notes
  // =============================================================
  let dataDb = require("./db/db");
  let id = 0;

  app.get("/api/notes", function (req, res) {
    res.json(dataDb);
    // console.log(dataDb)
  });


  // Route to add notes
  // =============================================================
  app.post("/api/notes", function (req, res){
    id++;
    let newNote = {
      title: req.body.title,
      text: req.body.text
    }
    newNote.id = id;
    dataDb.push(newNote);
    // console.log(dataDb);
    res.json(newNote);
  });


  // Route to delete notes
  // =============================================================
  app.delete("/api/notes/:id", function (req, res){
    let targetId = req.params.id;
    // console.log (targetId);
    let delNote = dataDb.filter(note =>{ 
      return note.id == targetId;
  })[0];
    const target = dataDb.indexOf(delNote);
    // console.log(target);
    dataDb.splice(target, targetId);
    let newData = JSON.stringify(dataDb);
    res.json(newData);
  })



// Listener
// =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });