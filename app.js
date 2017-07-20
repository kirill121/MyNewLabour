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

const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


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
	user = {
		firstName: 'Guest'
	}
	res.render('home', {user})
});

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

app.listen(3000, function(){
	console.log('server is up and running!');
});