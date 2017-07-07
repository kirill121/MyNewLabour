const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const employees = require('./routes/routes');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employee_database', {
	useMongoClient: true
})

app.set('view engine', 'ejs');
app.set('view cache', false);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.render('home');
});

app.use('/employees', employees);

app.listen(3000, function(){
	console.log('server is up and running!');
});