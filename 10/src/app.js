var express = require('express');
var winston = require('winston');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/onblabauthors");
var Schema = mongoose.Schema;

var authorSchema = new Schema({
  lastname : {type: String, required: true},
  firstname: {type: String, required: true},
  books : [{name: {type:String}}]
});

var Author = mongoose.model("Author", authorSchema);

winston.level = "silly";
winston.add(winston.transports.File, {filename: "application.log"});

var port = process.env.PORT || 3000;
var app = express();
var authorRouter = express.Router();

app.use(express.static("public"));
app.use("/bower_components", express.static("bower_components"));
app.use(bodyparser.urlencoded({
  extended:true
}));
app.use(bodyparser.json()); // this code needs to be defined before any req.body references
app.use("/api", authorRouter);

authorRouter.route("/authors")
  .get(function(req,res) {
    Author.find().lean().exec(function(err, data) {
      if(!err){
        res.json(data);
      }
      else {
        res.status(500,{status: "Cannot GET all authors"});
      }
    });
  })
  .post(function(req,res) {
    /**
     * I can pass the the whole req.body, because the JSON structure on the
     * client side is exactly the same as that of the mongodb 
     */
    var data = {
      lastname: req.body.lastname,
      firstname: req.body.firstname
//      books: req.body.books
    }
    console.log(req.body.books);
    var notimpt = new Author(req.body).save(function(err) {
      if(!err) {
        res.json({status: "saved 1 data"});
      }
      else {
        winston.log("error",err.message);
        res.status(500).send("Something wrong with saving author");
      }
    });
  })
  .put(function(req,res) {
    var searchCondition = {_id : req.body._id };
    var updateData = {
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      books: req.body.books
    }
    Author.findOneAndUpdate(searchCondition, updateData, function(err){
      if(!err){
        res.status(200, {status: "Updated author"});
      }
      else {
        winston.log("error", err.message);
        res.status(500, {err: err});
      }
    });
  })

app.listen(port, function(){
  winston.log('info', 'Application started');
});

