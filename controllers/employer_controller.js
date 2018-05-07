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
		var employerId = req.user.id
		Employer.findById(employerId).populate('employments').populate('pastEmployments').exec( (err, employer) => {
			if(err){
				console.log(err)
			} else {
				res.render ('viewEmployer', { user: req.user, employees: employer.employments, emps: employer.pastEmployments})
			}
		})
	},

	viewUpdate: function(req, res){
		const user = req.user
		res.render('viewUpdateEmployer', { user })
	},

	update: function (req, res){
		var employerId = req.user.id;
		Employer.findByIdAndUpdate(employerId, {
			email: req.body.email,
			companyName: req.body.companyName
		}, (err, update) => {
			if(err){
				console.log(err)
			} else { 
				update.save(function(err){
					if(err){
						console.log(err)
					} else {
						res.redirect('/employers/view/employerId') 
						}
					})
				}
		})
	},

	delete: function(req, res){
		var employerId = req.user.id;
		Employer.findByIdAndRemove(employerId, (err) => {
			if(err){
				console.log(err)
			} else { res.redirect('/home') }
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
										console.log(employer)
										res.redirect('/employers/view/employerId')
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
		var employeeId = req.params.id;
		var employerId = req.user.id;
		Employer.findById(employerId, function(err, employer){
			if(err){
				console.log(err)
			} else {
				var newEmploymentsArray = employer.employments.filter( employee => {
				return employee != employeeId
				})
				var noDupArray = Array.from(new Set(employer.pastEmployments));
				employer.pastEmployments = noDupArray;
				employer.employments = newEmploymentsArray
				console.log(employer)
				employer.save(function(err){
					if(err){
						console.log(err)
					} else {
						res.redirect('/employers/view/' + req.user.id)
					}
				})
			}
		})
	},

	remove: function(req, res){
		var employeeId = req.params.id;
		var employerId = req.user.id;
		Employer.findById(employerId, function(err, employer){
			if(err){
				console.log(err)
			} else {
				var newEmploymentsArray = employer.pastEmployments.filter( employee => {
				return employee != employeeId
				})
				employer.pastEmployments = newEmploymentsArray
				console.log(employer)
				employer.save(function(err){
					if(err){
						console.log(err)
					} else {
						res.redirect('/employers/view/' + req.user.id)
					}
				})
			}
		})
	},

	chooseEmployee: function(req, res){
		var user = req.user
		res.render('chooseEmployee', {user})
	},

	chooseBricklayer: function(req, res){
		var user = req.user;
		Employees.find({}, (err, employees) => {
			if(err){
				console.log(err)
			} else { res.render('chooseBricklayer', { employees, user }) }
		})	
	},
	choosePainter: function(req, res){
		var user = req.user;
		Employees.find({}, (err, employees) => {
			if(err){
				console.log(err)
			} else { res.render('choosePainter', { employees, user }) }
		})	
	},
	chooseManual: function(req, res){
		var user = req.user;
		Employees.find({}, (err, employees) => {
			if(err){
				console.log(err)
			} else { res.render('chooseManual', { employees, user }) }
		})	
	}
};	













