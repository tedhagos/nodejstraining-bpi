
// MODULES --------------------------------------------------------------------
// 
// The const keyword is now allowed in ES6, since we don't want to redefine
// our object references to the mysql and winston modules, or for that matter,
// all of the libraries we `require`, we might as well use const
//
const mysql		=	require("mysql");

// Let's explore using a decent logging module. `console.log()` isn't really
// welcome by ESLint
//
const winston = require("winston");

winston.level="silly";

// Let's get some params from the environment
//
var args = process.argv;

if(args.length < 5) {
  winston.log("error", "Incorrect params passed to CLI, exiting now");
	winston.log("info", "Usage is: node create.js lastname firstname email");
	process.exit();	
}

var lastname = args[2];
var firstname =	args[3];
var email = args[4];


// STEP 1: CREATE the mysql connection ------------------------------------------------
//
var conn = mysql.createConnection({
	host: "localhost",
	user: "test",
	password:"test",
	database: "nodetest"
});

// STEP 2: CONNECT and handle possible errors -----------------------------------------
//
conn.connect((err)=> {
	if(err) {
		winston.log("error",err.message);
	}
});

// STEP 3: EXECUTE THE QUERY ----------------------------------------------------------
//
var newrec = {lastname:lastname, firstname:firstname, email:email};
var sql = "INSERT INTO employees SET ?";
conn.query(sql,newrec,(err,result)=>{
	if(!err){		
		winston.log("info", "Rows affected : " + result.affectedRows);
	}
	else {
		winston.log("error", err.message);
	}
});

// STEP 4: END the connection ---------------------------------------------------------
//
conn.end();




