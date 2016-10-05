
// MODULES --------------------------------------------------------------------
//
// Modules are function libraries. We can use modules by simply 'require'ing 
// them. To create an HTTP server, we need to require the http module.
// Think of the require keyword as include in C/C++ or import in Java/C#/ObjC

var http = require('http');

// CREATE AN HTTP SERVER ------------------------------------------------------
var app = http.createServer(whenSomethingConnects);

// START THE APPLICATION
app.listen(3000, whenWereDoneStartingTheApp);

// HELPER FUNCTIONS -----------------------------------------------------------

function whenSomethingConnects(request, response){
  
  //The request and response objects are automatically passed to our
  //function whenever we call the createServer function
  
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write("Hello World");
  response.end()
}

function whenWereDoneStartingTheApp(){
  console.log("Application has started");
}

/*

NOTE:

To run the application
  node hellonode.js

To test the application from the command line
  curl http://localhost:3000

  Alternatively, launch a browser and navigate to http://localhost:3000
*/

