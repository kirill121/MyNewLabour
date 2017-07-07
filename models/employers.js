const mongoose = require('mongoose');

const Schema = mongoose.Schema

const EmployeeSchema = new Schema ({
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
	companyName: {type: String, required: true}
});

module.exports = mongoose.model('Employer', EmployerSchema)