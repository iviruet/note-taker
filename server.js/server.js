//////-----dependencies----//////

const express = require("express");
const path = require("path");
// const fs = require("fs");
// const http = ("http");

const app = express();
const PORT = 9191;

// Sets an initial port. We"ll use this later in our listener
// let PORT = process.env.PORT || 9191;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});

// let server = http.createServer(handleRequest);

// server.listen(PORT,() => {
//     console.log("Server is listening on PORT " + PORT)
// });

// function handleRequest(req, res) {
//     let path = req.url;
//     switch (path) {

//       case "/":
//         return displayRoot(res);
    
//       case "/savednotes":
//         return displayFoods(res);
    
//       default:
//         return display404(path, res);
//       }
//     }

//     function displayRoot(res){
//       let myHtml = "<html>" +
//       "<body><h1>Home</h1>" +
//       "<a href='/favfoods'>Favorite Foods</a>" +
//       "</body></html>";

//       res.writeHead(200, { "Content-Type" : "text/html"});

//       res.end(myHtml);
//   }

//   function displayFoods(res) {
//     var myHTML = "<html>" +
//     "<body><h1>Favorite Foods</h1>" +
//     "<p>Soup Dumplings!</p>" +
//     "<p>Pizza!</p>" +
//     "<p>Avocados!</p>" +
//     "<a href='/'>Go Home</a>" +
//     "</body></html>";

//     res.writeHead(200, { "Content-Type": "text/html"});
//     res.end(myHTML);
//   };



module.exports = function(app) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------
  
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  
    // If no matching route is found default to home
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  };

  //////////fs command to read db json data/////////////

  // fs.readFile("db.json", (err, data) => {
  //   if (err) throw err;
  //   let note = JSON.parse(data);
  //   console.log(note);
  // });

  ///////------API'S------/////////

  // ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

// var savedNotes = require("../index.html");
// var newNotes = require("../public/notes");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/index", function(req, res) {
    res.json(savedNotes);
  });

  app.get("/api/notes", function(req, res) {
    res.json(newNotes);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/index", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    if (savedNotes.length < 5) {
      savedNotes.push(req.body);
      res.json(true);
    }
    else {
      newNotes.push(req.body);
      res.json(false);
    }
  });

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function(req, res) {
    // Empty out the arrays of data
    savedNotes.length = 0;
    newNotes.length = 0;

    res.json({ ok: true });
  });
};
  
