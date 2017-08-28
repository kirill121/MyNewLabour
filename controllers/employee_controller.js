const Employee = require('../models/employees');

module.exports = {

	viewAll: function(req, res) {
		Employee.find({}, (err, employees) => {
			if(err) { 
				console.log(err)
			} else ( res.render('employees', { employees, user: req.user }) )
		})
	},

	viewSpecific: function(req, res) {
		var user;
		var employeeid = req.user.id;
		user = req.user;
		Employee.findById(employeeid, (err, employee) => {
			if(err){
				console.log(err);
			} else { 
				Employee.findById(employeeid).populate('employer').exec( (error, employeeToPopulate) => {
					if(error){
						console.log(error)
					} else {	
						res.render('view', { employee, user, employers: employeeToPopulate.employer })	
					}
				})
			  }
		})			
	},

	viewUpdate: function(req, res) {
		var user;
		var employeeid = req.params.id;
		user = req.user;
		Employee.findById(employeeid, (err, employee) => {
			if(err){
				console.log(err)
			} else { res.render('update', { employee, user }); }
		})
	},

	update: function(req, res) {
		var employeeid = req.params.id;
		Employee.findByIdAndUpdate(employeeid, {
			labourType: req.body.labour,
			firstName:req.body.name,
			lastName: req.body.surname,
			email: req.body.email,
			password: req.body.password
		}, (err) => {
			if(err){
				console.log(err)
			} else { res.redirect('/employees') }
		})
	},

	delete: function(req, res) {
		var employeeid = req.params.id;
		Employee.findByIdAndRemove(employeeid, (err) => {
			if(err){
				console.log(err)
			} else { res.redirect('/') }
		})
	}
};


