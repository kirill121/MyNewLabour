const Employer = require('../models/employers')
const Employee = require('../models/employees')
const jwt = require('jwt-simple')
const secret = require('../config/secret')

tokenForUser = (user) => {
	return jwt.encode({ sub:user.id }, secret)
}

module.exports = {

	adminView: function(req, res){
		var user;
		user = req.user;
		if(req.user.email == 'kirill121@yahoo.com'){
			Employer.find({}, (err, employers) => {
				if(err){
					console.log(err)
				} else{
					Employee.find({}, (err, employees) => {
						if(err){
							console.log(err)
						} else {
							res.render('adminView', {user, employers, employees})
						}
					})
				}
			})
		} else {res.redirect('/home')}	
	},
	
	signup: function(req, res){
		var user;
		if(req.user){
			user = req.user
		} else {
			user = {
				firstName: 'Guest'
			}
		}
		res.render('whoareyou', {user});
	},

	employerViewSignup: function(req, res){
		var user;
		if(req.user){
			user = req.user
		} else {
			user = {
				firstName: 'Guest'
			}
		}
		res.render('employerSignup', {user});
	},

	employeeViewSignup: function(req, res){
		var user;
		if(req.user){
			user = req.user
		} else {
			user = {
				firstName: 'Guest'
			}
		}
		res.render('employeeSignup', {user});
	},
	
	employerSignup: function(req, res, next) {
		const firstName = req.body.name;
		const lastName = req.body.surname;
		const email = req.body.email;
		const password = req.body.password;
		const companyName = req.body.companyName;

		if(!firstName || !lastName || !email || !password || !companyName ) {
			return res.status(422).send({error: 'Please fill out all paths'});	
		}	

		Employer.findOne({ email }, (error, existingUser) => {
			if(error){
				return next(error)
			}
			
			if(existingUser) {
				return res.status(422).send({ error: 'Sorry email is already in use'})
			}
			
			const employer = new Employer({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				companyName: companyName
			});

			employer.save(function(err){
				if(err){
					return next(err);
				}
				res.redirect('/login')	
			})
		});
	},

	employeeSignup: function(req, res, next){
		const labourType = req.body.labour;
		const firstName = req.body.name;
		const lastName = req.body.surname;
		const telephoneNo = req.body.telephone;
		const email = req.body.email;
		const password = req.body.password;
		const day = req.body.day;
		const month = req.body.month;
		const year = req.body.year;

		if(!labourType || !firstName || !lastName || !email || !password || !day || !month || !year ){
			return res.status(422).send({error: 'Please fill out all paths'});
		}

		Employee.findOne({ email }, (error, existingUser) => {
			if(error){
				return next(error)
			}

			if(existingUser) {
				return res.status(422).send({ error: 'Sorry email is already in use'})
			}

			const employee = new Employee ({
				labourType: labourType,
				firstName: firstName,
				lastName: lastName,
				telephoneNo: telephoneNo,
				email: email,
				password: password,
				day: day,
				month: month,
				year: year
			});

			employee.save(function(err){
				if(err){
					return next(err)
				}
				res.redirect('/login')
			});
		});
	},

	viewLogin: function(req, res){
		var user;
		if(req.user){
			user = req.user
		} else {
			user = {
				firstName: 'Guest'
			}
		}
		res.render('loginpage', {user});
	},

	login(req, res, next){
		console.log(req.user)
		res.cookie('jwt', tokenForUser(req.user), {maxAge: 3600000 * 24 * 7, httpOnly: false});		
		res.redirect('/home')
	},

	logout(req, res, next){
		res.cookie('jwt', '', {maxAge: 3600000 * 24, httpOnly: false})
		res.redirect('/')
	}

};