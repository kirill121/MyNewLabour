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
		employerId = req.user.id
		Employer.findById(employerId).populate('employments').exec( (err, employer) => {
			if(err){
				console.log(err)
			} else {
				console.log(employer)
				res.render ('viewEmployer', { user: req.user, employees: employer.employments})
			}
		})
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
		Employees.find({}, (err, employees) => {
			if(err){
				console.log(err)
			} else { res.render('employerViewEmployees', { employees, user }) }
		})
	},

	hireEmployee: function(req, res){
		var employeeId = req.params.employeeId;
		var employerId = req.user.id;
		Employees.findById(employeeId, (err, employee) => {
			if(err){
				console.log(err)
			} else {
				Employer.findByIdAndUpdate(employerId, {$push: {employments: employeeId}}, {new: true}, (err, updatedEmployer) => {
				if(err) {
					console.log(err)
				  } else {
				  	Employer.findById(employerId, (err, employer) => {
						if(err){
							console.log(err)
						} else {
							Employees.findByIdAndUpdate(employeeId, {$push: {employer: employerId}}, {new: true}, (err, updatedEmployee) => {
								if(err){
									console.log(err)
								} else {
									Employer.findById(employerId).populate('employments').exec( (error, employerToPopulate) => {
								      if (error) {
								      	console.log(error)
								      } else {

									  //     	var nameArray = employers.map( employer => {
											// 	var arr = employer.employments.map( employee => {
											// 		var obj = {};
											// 		obj.name = employee.firstName;
											// 		obj.surname = employee.lastName;
											// 		obj.telephone = employee.telephoneNo;
											// 		obj.id = employee.id;
											// 		return obj;
											// 	});
											// 	return arr;
											// })
											res.render('viewEmployer', {employees: employerToPopulate.employments, user: req.user})
								       } 
							    	});
								}
							})
						}
					})
				  }
				})
			}	
	  })
	},

	deleteEmployee: function(req, res){
		var employeeId = req.params.id
		var employerId = req.user.id;



		Employer.findById(employerId, function(err, employer){


			var newEmploymentsArray = employer.employments.filter( employee => {
				return employee != employeeId
			})

			employer.employments = newEmploymentsArray

			employer.save(function(err){
				if(err){
					console.log(err)
				} else {
					res.redirect('/employers/' + req.user.id)
				}
			})
		})
	}	
};













