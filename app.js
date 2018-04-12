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
const nodemailer = require("nodemailer");

const passport = require('passport');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


// mongoose.connect('mongodb://kirill:password@ds119533.mlab.com:19533/labourfi', {
// 	useMongoClient: true
// })

mongoose.connect('mongodb://localhost/employer_database', {
	useMongoClient: true
})

app.set('view engine', 'ejs');
app.set('view cache', false);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "k.kholine@elium.academy",
        pass: ""
    }
});

var rand, mailOptions, host, link;

app.get('/empsignup', function(req, res, next){
	console.log(req.query.to)
    rand=Math.floor((Math.random() * 100) + 54);
    host=req.get('host');
    link='http://localhost:3000/login?id='+rand
    mailOptions={
        to : req.query.to,
        subject : "Please confirm your Email account",
        html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
        console.log(error);
     }else{
        console.log("Message sent: " + response.message);
         }
	});
});

app.get('http://localhost:3000/login?id='+rand, function(req,res){
	console.log(req.protocol+":/"+req.get('host'));
	if((req.protocol+"://"+req.get('host'))==("http://"+host))
	{
		console.log("Domain is matched. Information is from Authentic email");
		if(req.query.id==rand)
		{
			console.log("email is verified");
			res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
		}
		else
		{
			console.log("email is not verified");
			res.end("<h1>Bad Request</h1>");
		}
	}
		else
		{
			res.end("<h1>Request is from unknown source");
		}
	});

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