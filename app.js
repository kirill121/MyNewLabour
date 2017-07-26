const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const employees = require('./routes/routes')
const employers = require('./routes/employerRoutes')
const authroutes = require('./routes/authroutes')
const cookieParser = require('cookie-parser')
const authentication = require('./controllers/authentication');
const path = require('path');
const Employer = require('./models/employers')

const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


// mongoose.connect('mongodb://kirill:password@ds119533.mlab.com:19533/labourfi', {
// 	useMongoClient: true
// })

mongoose.connect('mongodb://localhost/employee_database', {
	useMongoClient: true
})

app.set('view engine', 'ejs');
app.set('view cache', false);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {	
	var user;
	user = { firstName: 'Guest' }
  	res.render('home', {user})
});

app.get('/home', requireAuth, function(req, res){
	var user = req.user
	res.render('home', {user})
})

app.use('/', authroutes);

app.get('/employerHome', requireAuth, (req, res) => {
	res.render('employerHome', {user: req.user})
});

app.get('/employeeHome', requireAuth, (req, res) => {
	res.render('employeeHome', {user: req.user})
});

app.use('/employees', employees);

app.use('/employers', employers);

app.use((error, req, res, next) => {
	res.status(422).send('Hey theres been an error ' + error)
})

var port = process.env.PORT || 3000
app.listen(port, function(){
	console.log('server is up and running!');
});