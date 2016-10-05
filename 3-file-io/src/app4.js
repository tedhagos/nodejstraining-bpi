
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
      // res.write(readHTML());
      // The new version of the readHTML() function takes a callback
      // function as parameter. We will simply pass an anonymous 
      // function as a callback. When the readHTML() function terminates
      // , either successfully or unsuccessfully, our callback will be
      // invoked
      //
      readHTML(function(err, content){
        res.end(content);
      });
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
// The readHTML() function now takes callback function as argument. The idea
// is that when we are done reading the file, we will invoke the callback. If
// we encounter an error, we will also invoke the callback. 
// If the read is successfull, the callback func will be called, the first 
// parameter is null (err), then we pass the content. If the read is not
// successful, we pass the error object to the callback
//
function readHTML(callback){
  
  fs.readFile('index.html', 'utf-8', function(err, content) {
    if(err) {
      callback(err, null);
    }
    else {
      callback(null, content);
    }
  });
}


