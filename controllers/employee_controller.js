const Employee = require('../models/employees');

module.exports = {

	viewAll: function(req, res) {
		Employee.find({}, (err, employees) => {
			if(err) { 
				console.log(err)
			} else ( res.render('employees', { employees }) )
		})
	},

	viewAdd: function(req, res) {
		res.render('add');
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

	add: function(req, res) {
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
};
