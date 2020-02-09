// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 4000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//==============================================================

// Basic HTML route 
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  app.get("/assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, "public/assets/css/styles.css"));
  });

  app.get("/assets/js/index.js", function (req, res) {
    res.sendFile(path.join(__dirname, "public/assets/js/index.js"));
  });



// Listener

  app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });