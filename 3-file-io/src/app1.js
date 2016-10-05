

// READING A FILE FROM THE FILESYSTEM

// MODULE ---------------------------------------------------------------------
// 
// Node comes with libraries to read and write files. This functionality
// resides in the 'fs' library. Like the http module in our earlier
// examples, we can 'require' it into our project
//
var fs = require('fs');

// We will pass the filename as a command line parameter to our application.
// You can get to all the command line arguments via the argv array inside
// 'process' object. The 'process' module is automatically included in all
// running node applications, that is why we don't have to require it.
//
// process.argv is zero based, it's an array after all.
//    process.argv[0] # This is the node executable
//    process.argv[1] # This is the name of our app
//    process.argv[2] # This is the 1st cmd line param
//    process.argv[3] # 2nd cmd line param etc
//

// First, we test for the number of arguments passed in the cmd line
if(process.argv.length < 3){
  
  // We show some usage if the user did not specify a filename to read
  console.log('Usage: node app.js <fileToRead.ext>');

  // Then we exit the node application. For Java progs, this is the equivalent
  // of System.exit(0)
  process.exit();
}


// Now we can extract the filename
var filename = process.argv[2];

fs.readFile(filename, 'utf-8', function(err, content){

  // If there is an error, the err parameter to the function callback won't
  // be null, so we test for the truthiness of err
  //
  if(!err){
    console.log(content);
  }
  else {
    console.log(err.message);
  }
});


