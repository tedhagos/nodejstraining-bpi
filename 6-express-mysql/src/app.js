var express = require('express'),
    mysql = require('mysql'),
    winston = require('winston'),
    bodyparser = require('body-parser'),
    util = require('util');

var port = process.env.PORT || 3000;
var app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({
  extended:true
}));

winston.level = "silly";

app.get("/employee", function(req, res){
  readAll(function(err, data){
    res.end(JSON.stringify(data));
  });
});

app.post("/employee", function(req, res){
  
  var employee = {
    lastname : req.body.lname,
    firstname : req.body.fname,
    email : req.body.email
  };
  writeRecord(employee, function(err, affectedrows){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write("Added : " + affectedrows + " records");
    res.end("<a href='/employeeadd.html'>Add another one</a>");
  });

});

app.listen(port, function(){
  winston.log("info", "App Started");
});

/// Database functions

function writeRecord(e, callback){

  var conn = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "test",
    database: "nodetest"    
  });

  conn.connect(function(err){
    if(err){
      winston.log("error", err.message);
    }
  });

  var sql = util.format("INSERT INTO employees(lastname, firstname, email) VALUES('%s','%s','%s')", e.lastname, e.firstname,e.email);
  winston.log("silly", sql);
  conn.query(sql,function(err, rows){
    if(!err){
      winston.log("info", "Added %d rows", rows.affectedRows);
      callback(null,rows.affectedRows);
    }
    else {
      winston.log("error", err.message);
      callback(err,null);
    }
  });
  conn.end();
}


function readAll(callback) {
  var conn = mysql.createConnection({
    host: "localhost",
    user: "test",
    password: "test",
    database: "nodetest"
  });

  conn.connect(function(err){
    if(err){
      winston.log("error", err.message);
    }
  });

  var sql = "SELECT lastname, firstname, email FROM employees";
  conn.query(sql, function(err, rows){
    var temp = [];
    if(!err){
      rows.forEach(function(i){
        temp.push(i);
      });
    }
    else {
      winston.log("error", err.message);
      callback(err, null);
    }
    callback(null,temp);  
  });

  conn.end();

}