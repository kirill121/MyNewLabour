const Employee = require('../models/employees');

module.exports = {

	viewAll: function(req, res) {
		Employee.find({}, (err, employees) => {
			if(err) { 
				console.log(err)
			} else ( res.render('employees', { employees }) )
		})
	},

	viewSpecific: function(req, res) {
		var employeeid = req.params.id;
		Employee.findById(employeeid, (err, employee) => {
			if(err){
				console.log(err);
			} else { res.render('view', { employee }) }
		})
	},

	viewUpdate: function(req, res) {
		var employeeid = req.params.id;
		Employee.findById(employeeid, (err, employee) => {
			if(err){
				console.log(err)
			} else { res.render('update', { employee }); }
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
			} else { res.redirect('/employees') }
		})
	}

	// updateEmployee: function(req, res){
	// 	Employees.findByIdAndUpdate(employeeId, {$push: {employers: employerId}}, {new: true}, (err) => {
	// 		if(err){
	// 			console.log(err)
	// 		} else {
	// 			Employees.find({}).populate('employer').exec( (err, updatedEmployee) => {
	// 				if(err){
	// 					console.log(err)
	// 				} else {
	// 					res.render('updatedEmployee', {updatedEmployee})
	// 				}
	// 			})
	// 		}
	// 	})
	// }
};


