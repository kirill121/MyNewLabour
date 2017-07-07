const Employer = require('../models/employers');

module.exports = {

	viewEmployers: function(req, res){
		Employer.find({}, (err, employers) => {
			if(err){
				console.log(err);
			} else {res.render ('employers', { employers })}
		});
	},

	viewEmployer: function(req, res){
		var employerId = req.params.id;
		Employer.findById(employerId, (err, employer) => {
			if(err){
				console.log(err);
			} else {res.render ('viewEmployer', { employer })}
		});
	},

	viewAddEmployer: function(req, res){
		res.render('addEmployer')
	},

	viewUpdateEmployer: function(req, res){
		var employerId = req.params.id;
		Employer.findById(employerId, (err, employer) => {
			if(err){
				console.log(err)
			} else {res.render ('viewUpdateEmployer', { employer })}
		});
	},

	addEmployer: function(req, res){
		Employer.create({
			firstName: req.body.name,
			lastName: req.body.surname,
			email: req.body.email,
			companyName: req.body.companyName
		}, (err, add) => {
			if(err){
				console.log(err)
			} else { res.redirect ('/employers') }
		})
	},

	updateEmployer: function (req, res){
		var employerId = req.params.id;
		Employer.findByIdAndUpdate(employerId, {
			firstName: req.body.name,
			lastName: req.body.surname,
			email: req.body.email,
			compaanyName: req.body.companyName
		}, (err, update) => {
			if(err){
				console.log(err)
			} else { res.redirect('/employers') }
		})
	},

	deleteEmployer: function(req, res){

	}
};