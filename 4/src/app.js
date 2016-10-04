
// MODULES --------------------------------------------------------------------
//
var http = require('http');

// We will use the Router middleware to handle our routes. The Router middle
// ware allows us write cleaner logic for handling our endpoints. We can
// certainly still write our own routing logic, handles most of the complexity
// involved when routing HTTP endpoints
//
var Router = require('router');
var finalhandler = require('finalhandler');

// We will use the bodyparser module so that we can get to the HTTP body 
// without much fuss. If you try to handle the parsing of the HTTP body by
// yourself, you'll need to write program logic that listens to the request
// stream. That may seem pretty low level for our purpose
//
var bodyparser=require('body-parser');

var fs = require('fs');

// Create a router object using the Router() constructor
var router = Router();

// Set our port number. You've seen this before
var port = process.env.PORT || 3000;

// The bodyparser module is a middleware. We need to `use` it in order to
// become available to our application
//
router.use(bodyparser.urlencoded({extended:true}));

// Let's setup our route for the home page. Note the syntax on how to set
// up route, it is much simpler than our previous codes
//
router.get('/', (req, res)=>{
  fs.readFile("index.html",'utf-8',(err, data) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  });
});

// Let's setup another route for the /author endpoint
//
router.post('/author', (req, res) => {
  
  // The .lastname, .firstname and .email properties of the 
  // req.body are the name properties of the HTML form that
  // submitted the request to the /author endpoint
  //
  console.log(req.body.lastname);
  console.log(req.body.firstname);
  console.log(req.body.email);
  res.end("author");

});


// Setup our createServer() and listen to incoming requests
//
http.createServer((req,res) => {
  
  // Let the router object handle the Request and Response
  // objects
  //
  router(req, res, finalhandler(req,res));

}).listen(port,()=>{

  console.log("%s is listening on port:%d", process.argv[1], port);

});

