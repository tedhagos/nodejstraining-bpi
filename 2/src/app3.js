


// MODULES ---------------------------------------------------------------------

var http = require('http');

// CREATE THE SERVER -----------------------------------------------------------

http.createServer(function(req, res) {
  
  res.writeHead(200, {'Content-Type':'text/plain'});
 
  var url = req.url;
  var method = req.method;

  // You may want to remove the leading forward slash on the URL
  // You can do that via the replace() function. Might be convenient to convert
  // everything to UPPERCASE so our routing code looks cleaner
  //
  var endpoint = url.replace("/", "").toUpperCase();

  // We can do some basic routing using our URL and METHOD knowledge
  // The code below demonstrates routing, although, we are routing simply
  // based on the URL, not the method yet
  
  switch(endpoint){
    // We are on the home page
    case "" :
      break;
    case "AUTHOR" :
      res.write(authorRouter(req,res));
      break;
    case "BOOKS" :
      res.write("Books route is not implemented yet");
      break;
    default: 
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.write("Page not found");
  }

  res.end();

}).listen(3000, function() {
  console.log("Application started");
});

// ROUTING FUNCTIONS ----------------------------------------------------------
// 
function authorRouter(req, res) {
  
  var returnval = "";
  var method = req.method.toUpperCase();

  switch(method){
    case "GET":
      returnval = "GET AUTHOR";
      break;
    case "POST":
      returnval = "POST AUTHOR";
      break;
    case "PUT":
      returnval = "PUT AUTHOR";
      break;
    case "DELETE":
      returnval = "DELETE AUTHOR";
      break;
    default:
      returnval = "Unknown request"
  } 
  return returnval
}

// NOTES
//
// You can test the routes by using the curl utility
//
//  curl           http://localhost:3000/author # returns GET AUTHOR
//  curl -x POST   http://localhost:3000/author # returns POST AUTHOR
//  curl -x PUT    http://localhost:3000/author # returns PUT AUTHOR
//  curl -x DELETE http://localhost:3000/author # returns DELETE AUTHOR
//  curl           http://localhost:3000/books #  NOT IMPLEMENTED  
//  
// Alternatively, you can use the Postman Google Chrome plugin to
// test the various methods of our endpoint
//

