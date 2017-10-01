var express = require('express'); 
var app = express();
var bodyParser = require('body-parser'); 


app.use(bodyParser.json());  

app.use(require('./server/controllers'));


app.listen('4090', function(){
	console.log('server is running');
});