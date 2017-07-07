const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EmployeeSchema = new Schema ({
	labourType: {type: String, required: true},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	password: {type: String, required: true},
	day: {type: Number, required: true},
	month: {type: String, required: true},
	year: {type: Number, required: true}
});

module.exports = mongoose.model('Employee', EmployeeSchema)