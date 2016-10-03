

// MODULES ---------------------------------------------------------------------

var http = require('http');

// CREATE THE SERVER -----------------------------------------------------------
//
// This application does exactly the same thing as hellonode.js, but in this
// version of the code, we simply wrote the callback function inside the
// createServer call. There is no need to define the function separately.
// This kind of coding is more common among Node programmers

var app = http.createServer(function(req, res) {
  
  res.writeHead(200, {'Content-Type':'text/plain'});
  res.write('Hello World 2');
  res.end();

});

// START THE SERVER ------------------------------------------------------------
//
// Same thing is happening here, we simply passed the callback function as
// a second parameter to the .listen() method

app.listen(3000, function() {
  console.log("Application started");
});

