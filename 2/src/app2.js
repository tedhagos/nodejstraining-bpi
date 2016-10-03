

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
      res.writeHead(200,{'Content-Type':'text/plain'});
      res.write("Home Page");
      break;
    case "AUTHOR" :
      res.writeHead(200, {'Content-Type':'text/plain'});
      res.write("Hello Author");
      break;
    case "BOOKS" :
      res.writeHead(200, {'Content-Type':'text/plain'});
      res.end("Hello Books");
      break;
    default: 
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.write("Page not found");
  }

  res.end();

}).listen(3000, function() {
  console.log("Application started");
});
