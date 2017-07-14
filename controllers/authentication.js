const User = require('../models/user')
const jwt = require('jwt-simple')
const secret = require('../config/secret')

tokenForUser = (user) => {
	return jwt.encode({ sub:user.id }, secret)
}

module.exports = {
	
	viewSignup: function(req, res){
		res.render('signup');
	},

	signup: function(req, res, next) {
		const firstName = req.body.name;
		const lastName = req.body.surname;
		const email = req.body.email;
		const password = req.body.password;
		const companyName = req.body.companyName;

		if(!firstName || !lastName || !email || !password || !companyName ) {
			return res.status(422).send({error: 'Please fill out all paths'});	
		}	

		User.findOne({ email }, (error, existingUser) => {
			if(error){
				return next(error)
			}
			
			if(existingUser) {
				return res.status(422).send({ error: 'Sorry email is already in use'})
			}
			
			const user = new User({
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password,
				companyName: companyName
			});

			user.save(function(err){
				if(err){
					return next(err);
				}
				res.redirect('/')	
			})
		});	
		
	},

	viewLogin: function(req, res){
		res.render('loginpage');
	},

	login(req, res, next){
		res.cookie('jwt', tokenForUser(req.user), {maxAge: 3600000 * 24 * 7, httpOnly: false});
		res.redirect('/')
	},

	logout(req, res, next){
		console.log('bing')
		res.cookie('jwt', '', {maxAge: 3600000 * 24, httpOnly: false})
		res.redirect('/')
	}
};