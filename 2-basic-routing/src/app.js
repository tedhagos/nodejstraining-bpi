


// MODULES ---------------------------------------------------------------------

var http = require('http');

// CREATE THE SERVER -----------------------------------------------------------

http.createServer(function(req, res) {
  
  res.writeHead(200, {'Content-Type':'text/plain'});
 
  // You can get the HTTP endpoint that the user-agent is navigating to by getting 
  // the url property of the Request object 
  var url = req.url;

  // You can get the HTTP method the user-agent is getting the method property
  // of the Request object
  var method = req.method;

  // At this point, we are simply echoing the URL and METHOD properties of
  // the Request object

  res.write('URL:' + url + ' | ' + 'METHOD: ' + method);
  res.end();

}).listen(3000, function() {
  console.log("Application started");
});
