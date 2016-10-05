
var fs=require('fs');

function router() {
  readFromSomewhere(function(err, data){
    console.log(data);
  });
}

function readFromSomewhere(cb) {
  var returnval = "";
  return fs.readFile('myfile.txt', 'utf-8', function(err, d){
    if(!err){
      cb(null,d);
    }
    else {
      cb(err,null);
    }
  });
}

router();
