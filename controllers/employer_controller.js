const Employer = require('../models/employers');
const Employees = require('../models/employees');

module.exports = {

	viewAll: function(req, res){
	    Employer.find({}).populate('employments').exec( (error, employers) => {
	      if (error) {
	      	console.log(error)
	      } else {res.render ('employers', { employers })} 
    	});													
    },	

	viewSpecific: function(req, res){
		var employerId = req.params.id;
		Employer.findById(employerId, (err, employer) => {
			if(err){
				console.log(err);
			} else {res.render ('viewEmployer', { employer })}
		});
	},

	viewAdd: function(req, res){
		
		res.render('addEmployer')
	},

	viewUpdate: function(req, res){
		var employerId = req.params.id;
		Employer.findById(employerId, (err, employer) => {
			if(err){
				console.log(err)
			} else {res.render ('viewUpdateEmployer', { employer })}
		});
	},

	add: function(req, res){

		Employer.create({
			firstName: req.body.name,
			lastName: req.body.surname,
			email: req.body.email,
			password: req.body.password,
			companyName: req.body.companyName
		}, (err, add) => {
			if(err){
				console.log(err)
			} else { res.redirect ('/employers') }
		})
	},

	update: function (req, res){
		var employerId = req.params.id;
		Employer.findByIdAndUpdate(employerId, {
			firstName: req.body.name,
			lastName: req.body.surname,
			email: req.body.email,
			companyName: req.body.companyName
		}, (err, update) => {
			if(err){
				console.log(err)
			} else { res.redirect('/employers') }
		})
	},

	delete: function(req, res){
		var employerId = req.params.id;
		Employer.findByIdAndRemove(employerId, (err) => {
			if(err){
				console.log(err)
			} else { res.redirect('/employers') }
		})
	},

	viewEmployees: function(req, res){
		var employerId = req.params.id;
		Employees.find({}, (err, employees) => {
			if(err){
				console.log(err)
			} else { res.render('employerViewEmployees', { employees, employerId }) }
		})
	},

	hireEmployee: function(req, res){
		var employeeId = req.params.employeeId;
		var employerId = req.params.employerId;
		Employees.findById(employeeId, (err, employee) => {
			if(err){
				console.log(err)
			} else {
				Employer.findByIdAndUpdate(employerId, {$push: {employments: employeeId}}, {new: true}, (err, updatedEmployer) => {
			if(err) {
				console.log(err)
			  } else {
			  	res.render('updatedEmployer', {updatedEmployer})
			  }
			})
		}	
	  })
	}
};








