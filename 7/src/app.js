
// MODULES ====================================================================
var express = require('express');
var winston = require('winston');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/cm");


var candidateSchema = new Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true},
  middle_initial: { type: String },
  requiring_company: { type: String },
  position:  { type : String },
  level: { type: String }
});

var Candidate = mongoose.model("Candidate", candidateSchema);

winston.level= "silly";

var port = process.env.PORT || 3000;
var app = express();

app.use(bodyparser.urlencoded({
  extended:true
}));
app.use(bodyparser.json());
app.use(express.static("public"));
app.use("/bower_components", express.static("bower_components"));

app.get("/candidates", (req, res) => {
  Candidate.find((err, data) => {
    res.send(data);
  });
});

app.get("/candidates/:lastname/:firstname", (req, res) => {
  var fname = req.params.firstname;
  var lname = req.params.lastname;
  var condition = {lastname: lname, firstname: fname};
  winston.log("info", "params | lastname: %s , firstname: %s", lname, fname);
  Candidate.findOne({lastname: lname}, (err, data) => {
    if(!err){
      res.send(data || {"stat" : "null"});
    }
    else {
      res.send(err);
    }    
  });
});

app.post("/candidates", (req, res) => {
  var candidate = new Candidate({
    lastname : req.body.lastname,
    firstname: req.body.firstname,
    middle_initial: req.body.middle_initial,
    requiring_company: req.body.requiring_company,
    position : req.body.position,
    level: req.body.level
  });
  candidate.save((err) => {
    if(!err) {
      winston.log("info", "Added candidate %s %s", req.body.firstname, req.body.lastname);
      //res.end(JSON.stringify({result: "Ok"}));
      Candidate.find().lean().exec((err, data) => {
        if(!err) {
          res.send(data);
        }
        else {
          res.send(err);
        }
      });
    }
    else {
      winston.log("error", err.message);
    }
  });
});

app.listen(port, ()=> {
  winston.log("info", "App Started");
});
