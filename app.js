const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeBuilder = require('./routes/routes');
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

app.get('/employerHome', (req, res) => {
	res.render('employerHome')
});

app.get('/employeeHome', (req, res) => {
	res.render('employeeHome')
});

var employees = routeBuilder(require('./controllers/employee_controller'))
app.use('/employees', employees);

var employers = routeBuilder(require('./controllers/employer_controller'))
app.use('/employers', employers);

app.listen(3000, function(){
	console.log('server is up and running!');
});