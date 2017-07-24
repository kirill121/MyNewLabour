const Employer = require('../models/employers');
const Employees = require('../models/employees');

module.exports = {

	viewAll: function(req, res){
	    Employer.find({}).populate('employments').exec( (error, employers) => {
	      if (error) {
	      	console.log(error)
	      } else {res.render ('employers', { employers, user: req.user })} 
    	});													
    },	

	viewSpecific: function(req, res){
		res.render ('viewEmployer', { user: req.user })
	},

	viewUpdate: function(req, res){
		res.render('viewUpdateEmployer', { user: req.user })
	},

	update: function (req, res){
		var employerId = req.user.id;
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
		var employerId = req.user.id;
		Employer.findByIdAndRemove(employerId, (err) => {
			if(err){
				console.log(err)
			} else { res.redirect('/') }
		})
	},

	viewEmployees: function(req, res){
		var user = req.user;
		console.log(req.user)
		Employees.find({}, (err, employees) => {
			if(err){
				console.log(err)
			} else { res.render('employerViewEmployees', { employees, user }) }
		})
	},

	hireEmployee: function(req, res){
		var employeeId = req.params.employeeId;
		var employerId = req.params.employerId;
		Employees.findById(employeeId, (err, employee) => {
			if(err){
				console.log(err)
			} else {
				Employer.findByIdAndUpdate(employerId, {$push: {employments: employee.firstName}}, {new: true}, (err, updatedEmployer) => {
				if(err) {
					console.log(err)
				  } else {
				  	Employer.findById(employerId, (err, employer) => {
						if(err){
							console.log(err)
						} else {
							Employees.findByIdAndUpdate(employeeId, {$push: {employer: employer.companyName}}, {new: true}, (err, updatedEmployee) => {
								if(err){
									console.log(err)
								} else {
									res.redirect('/employers')
								}
							})
						}
					})
				  }
				})
			}	
	  })
	}
};












