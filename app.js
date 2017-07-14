const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeBuilder = require('./routes/routes');
const mongoose = require('mongoose');
const employees = require('./routes/routes')
const employers = require('./routes/employerRoutes')
const authroutes = require('./routes/authroutes')
const cookieParser = require('cookie-parser')


mongoose.connect('mongodb://localhost/employee_database', {
	useMongoClient: true
})

app.set('view engine', 'ejs');
app.set('view cache', false);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser())

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/employerHome', (req, res) => {
	res.render('employerHome')
});

app.get('/employeeHome', (req, res) => {
	res.render('employeeHome')
});

//app.use('/home', authroutes)

app.use('/', authroutes);

app.use('/employees', employees);

app.use('/employers', employers);

app.use((error, req, res, next) => {
	res.status(422).send('Hey theres been an error ' + error)
})

app.listen(3000, function(){
	console.log('server is up and running!');
});