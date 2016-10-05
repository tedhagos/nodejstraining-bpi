var winston = require('winston');
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;
winston.level = "silly";
winston.add(winston.transports.File,{ filename: "./app.log"});

mongoose.connect("mongodb://localhost/bookstore");
var Schema = mongoose.Schema;

var authorSchema = new Schema({
  lastname : {type: String, required: true},
  firstname: {type: String, required: true},
});

var Author = mongoose.model('Author', authorSchema);

var app = express();
app.use(express.static("public"));
app.use("/bower_components",express.static("bower_components"));
app.use(bodyparser.urlencoded({
  extended:true
}));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  //res.writeHead(200, {'Content-Type':'text/html'})
  res.send("home page");
});

app.get("/authors", (req,res) =>{
  Author.find({},'lastname firstname',(err, data) => {
    if(!err){
      res.send(data);
    }
    else {
      winston.log("err", err);
    }
  });
});

app.get("/authors/:lastname/:firstname", (req,res) =>{
  var lname = req.params.lastname;
  var fname = req.params.firstname;
  Author.findOne({lastname: lname, firstname: fname}, (err, data) => {
    res.send(data);
  })
});

app.post("/authors", (req, res) => {
  var lname = req.body.lastname.toLowerCase();
  var fname = req.body.firstname.toLowerCase();

  var tempAuthor = new Author({
    lastname: lname,
    firstname: fname
  });
  tempAuthor.save((err)=>{
    if(err){
      winston.log("error", err);
    }
  });
  res.send(JSON.stringify({status: "Record added"}));
});

app.put("/authors", (req, res) => {
  
});

app.listen(port, () => {
  winston.log("info", "App Started");  
});