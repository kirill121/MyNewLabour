const Employee = require('../models/employees');

module.exports = {

	viewEmployees: function(req, res) {
		Employee.find({}, (err, employees) => {
			if(err) { 
				console.log(err)
			} else ( res.render('employees', { employees }) )
		})
	},

	viewAddEmployee: function(req, res) {
		res.render('add');
	},

	viewEmployee: function(req, res) {
		var employeeid = req.params.id;
		Employee.findById(employeeid, (err, employee) => {
			if(err){
				console.log(err);
			} else { res.render('view', { employee }) }
		})
	},

	viewUpdateEmployee: function(req, res) {
		var employeeid = req.params.id;
		Employee.findById(employeeid, (err, employee) => {
			if(err){
				console.log(err)
			} else { res.render('update', { employee }); }
		})
	},

	addEmployee: function(req, res) {
		Employee.create({
			labourType: req.body.labour,
			firstName: req.body.name,
			lastName: req.body.surname,
			email: req.body.email,
			password: req.body.password,
			day: req.body.day,
			month: req.body.month,
			year: req.body.year
		}, (err, add) => {
			if(err){
				console.log(err)
			} else { res.redirect('/employees') }
		})
	},

	updateEmployee: function(req, res) {
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

	deleteEmployee: function(req, res) {
		var employeeid = req.params.id;
		Employee.findByIdAndRemove(employeeid, (err) => {
			if(err){
				console.log(err)
			} else { res.redirect('/employees') }
		})
	}
};
