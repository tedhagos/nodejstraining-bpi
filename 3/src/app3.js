

// MODULES --------------------------------------------------------------------
//
var http = require('http');
var fs = require('fs');

// why ?
var port = process.env.PORT || 3000;

http.createServer(function(req, res){
  
  // Let's set the header and default it to OK (200)
  res.writeHead(200,{'Content-Type':'text/html'});

  var url = req.url.toUpperCase();
  switch(url) {
    case "/":
      // let's read an html page
      res.write(readHTML());
      break;
    case "/AUTHORS":
      res.write("Author page");
      res.end();
      break;
    case "/BOOKS":
      res.write('Books page');
      res.end();
      break;
    default:
      // If the user navigates to anything other than /, /author or /books
      // we will respond with a 404. This will override the earlier
      // writeHead in line 13 above
      //
      res.writeHead(404, {'Content-Type':'text/html'});
      res.write("Page not found");
      res.end();
  }

}).listen(port, function(){
  console.log("Application started");
});

// HELPER FUNCTIONS -----------------------------------------------------------
//
function readHTML(){

  // readHTML is now a function that returns the string content of the file
  // that was read. Our approach in app3.js is to use the Synchronous version
  // of the readFile function. This way, we can get to the contents of the file
  // by having it as a return value of the readFile() function rather than as
  // a parameter to a callback function within readFile().
  //
  // NOTE: Most of the libraries of NodeJS have an Synchronous counterpart. But
  // by default, most, if not all, of the libraries are Async. The naming
  // convention is quite easy to get along with, if you want to use the Sync
  // version of the library, you usually just have to add the 'Sync' word to it.
  // e.g. readFile() and readFileSync()


  var returnval = "If you see this text, there was an erro reading the file";

  try {
    returnval = fs.readFileSync('index.html', 'utf-8');
  }
  catch(err) {
    console.log("ErrorNo: %d", err.errno);
    console.log("ErrMsg: %s", err.message);
  }

  return returnval;
}


