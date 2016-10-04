
// MODULES --------------------------------------------------------------------
const winston = require('winston');
const http =require("http");
const mysql =require("mysql");

// SET THE PORT
var port = process.env.PORT || 3000;

winston.level = "silly";

http.createServer(function (req,res){

  write(req, res);

}).listen(port,function(){
  winston.log("info", "%s is listening on port:%d", process.argv[1], port);
});


// HELPER FUNCTIONS -----------------------------------------------------------


// FUNCTION WRITE() ********************************************* 
//
function write(req, res) {
  
  var conn = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "test",
    database: "nodetest"
  });

  conn.connect(function(err){
    if(err) {
      winston.log(err);
      
    }
  });

  var post = {lastname: "Gosling", firstname: "James", email: "jgosling@sun.com"};
  conn.query("INSERT INTO employees set ?",post,function(err, result){
    if(err) {
      winston.log(err);
    }
    else {
      winston.log(result);
      res.end("OK");
    }
  });

  conn.end();    

}


// FUNCTION READ() ***********************************************
//
function read(req,res){

  var result=""; 

  var conn = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "test",
    database: "nodetest"
  });

  conn.connect(function(err){
    if(err) {
      winston.log(err);
    }
  });

  var sql = "SELECT * FROM employees;";
  
  conn.query(sql,function(err, rows){

    //for(var i = 0; i<rows.length; i++) {
    //  winston.log(rows[i].lastname);
    //}

    /*
    result += "["
    rows.forEach((i)=>{
      result += util.format("{lastname: '%s', firstname: '%s', email: '%s'},", i.lastname, i.firstname, i.email);
    });
    result += "]"
    */

    var temp = [];
    rows.forEach(function(i){
      temp.push({lastname: i.lastname, firstname: i.firstname, email: i.email });
      
    });

    res.writeHead(200,{"Content-Type":"x-application/json"});
    winston.log(temp);
    res.write(JSON.stringify(temp));
    res.end();
  });

  conn.end();  
}
