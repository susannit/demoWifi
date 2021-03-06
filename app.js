'use strict';

var util = require('util');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require("mongodb");
var userInfoApi = require("./userInfo.js");
var payInfoApi = require("./btInfo.js");
var gateway = require("./gateway.js")

/**
 * Instantiate your server and a JSON parser to parse all incoming requests
 */
var app = express();
var jsonParser = bodyParser.json();
app.use(jsonParser);


 // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    console.log("App now running on port", server.address().port);
  });
// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGOLAB_AMBER_URI, function (err, database) {
 if (err) {
    console.log(err);
    process.exit(1);
  } db = database;
  
  /**
 * Enable CORS (http://enable-cors.org/server_expressjs.html)
 * to allow different clients to request data from your server
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(jsonParser);
var clientPath = path.resolve(__dirname, 'client');

console.log(clientPath);
 app.use(express.static(clientPath));
 app.get('/', function(req, res){
     res.sendFile('UserInfo.html', {root: clientPath});
 });


app.use('/scripts', express.static(__dirname + '/node_modules/braintree-web/dist/'));

/**
 * Route that returns a token to be used on the client side to tokenize payment details
 */
app.post('/clientoken', gateway.getToken());

/**
 * Route to process a sale transaction
 */
 
 var paymentInfoApi = new payInfoApi(db.collection('WifiPaymentInfo'));
app.post('/process', jsonParser,gateway.sellAmount(request,response));
  
  var userApi = new userInfoApi(db.collection('WifiUserInfo'));

//Create Userinfo
app.post("/api/userInfo", function(req, res) {
	var saveUser = userApi.createUser(req.body,function (err,doc){
		if (err) {
		  handleError(res, err.message, "Failed to create new User.");
		} else {
		  res.status(201).json(doc.ops[0]);
		}
	});   
 });

//getUserInfo
	app.get("/api/userInfo", function(req, res) {
		userApi.getUserList(function(err,docs){
			if (err) {
			  handleError(res, err.message, "Failed to get contacts.");
			} else {
			  res.status(201).json(docs);
			}
		});
	});


});
