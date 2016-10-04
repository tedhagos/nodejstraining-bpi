
// MODULES ====================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var candidateSchema = new Schema({
  lastname: { type: String, required: true },
  firstname: { type: String, required: true},
  middle_initial: { type: String },
  requiring_company: { type: String },
  position:  { type : String },
  level: { type: String }
});

var Candidate = mongoose.model("Candidate", candidateSchema);