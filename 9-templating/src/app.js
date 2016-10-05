var express = require('express');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/onblab");

var app = express();

var Schema = mongoose.Schema;
var authorSchema = new Schema({
  lastname : String,
  firstname: String,
  books: [String]
});

var Author = mongoose.model("Author", authorSchema);

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get("/", (req,res) =>{
  res.json("Home Page");
});

app.get("/authors/:firstname/:lastname", (req, res) => {
  var firstname = req.params.firstname;
  var lastname = req.params.lastname;

  Author.findOne({lastname:lastname,firstname:firstname}, (err, data) => {
    if(!err){
      //res.send(data.lastname);
      res.render("authors.jade", {
        firstname:data.firstname, 
        lastname:data.lastname,
        books: data.books
      });
    }
    else {
      res.send(err);
    }
  });
});

app.listen(3000);

