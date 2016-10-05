
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
      readHTML(req, res);
      console.log('Unreachable code?'); // Unreachable code?
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
function readHTML(req, res){

  // It's a bit awkward to pass the request and response objects to helper
  // functions, but at this point, it cannot be helped. We will take a look
  // at a different solution in app4.js, for now, we need to pass the 
  // request and response objects because of the async nature of the
  // fs.readFile command. Our code will be extremely difficult if we don't
  // the req,res objects to readHTML

  fs.readFile('index.html', 'utf-8', function(err, content) {
    if(err) {
      // We'll send an HTTP error code through the header first
      console.log("ErrNO: %d", err.errno);
      console.log(err.message);
      res.writeHead(500, {'Content-Type':'text/html'});
      res.writeHead(err.message);
    }
    else { 
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write(content);
      res.end();
    }
  });
}


